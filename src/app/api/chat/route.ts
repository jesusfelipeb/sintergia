import config from "@/lib/config";
import { SYSTEM_PROMPT } from "@/lib/agent-prompt";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GROQ_API_URL       = "https://api.groq.com/openai/v1/chat/completions";
const MODEL              = config.agent.model;
const MAX_MESSAGES       = config.agent.max_messages_per_session;
const MAX_MESSAGE_LENGTH = config.agent.max_chars_per_message;
const MAX_TOKENS         = config.agent.max_tokens_response;
const TEMPERATURE        = config.agent.temperature;

const LEAD_SIGNALS           = config.agent.lead_signals;
const LEAD_MIN_MATCHES       = config.agent.lead_signals_min_matches;
const LEAD_MIN_USER_MESSAGES = config.agent.lead_signals_min_user_messages;

// ─────────────────────────────────────────────────────────────
// Protocolo de clasificación: el agente termina cada respuesta
// con `---META---\n{"lead_quality":..., "intent":...}`. El marker
// y el JSON se filtran del stream (no llegan al cliente).
// ─────────────────────────────────────────────────────────────
const META_MARKER = "---META---";
const META_REGEX  = /---META---\s*(\{[\s\S]*?\})/;

const VALID_QUALITY = ["caliente", "tibio", "curioso"] as const;
const VALID_INTENT  = ["agendar", "info", "demo", "soporte"] as const;

type LeadQuality = (typeof VALID_QUALITY)[number];
type LeadIntent  = (typeof VALID_INTENT)[number];

interface Classification {
  lead_quality: LeadQuality;
  intent:       LeadIntent;
  source:       "llm_tag" | "keyword_fallback";
}

// Fallback heurístico cuando el LLM no emite tag válido
function classifyByKeywords(messages: ChatMessage[]): Classification | null {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content.toLowerCase());

  if (userMessages.length < LEAD_MIN_USER_MESSAGES) return null;

  const allText    = userMessages.join(" ");
  const matchCount = LEAD_SIGNALS.filter((s) => allText.includes(s)).length;
  if (matchCount < LEAD_MIN_MATCHES) return null;

  // Heurística simple: ≥4 matches o palabra "ya/quiero/contratar" → caliente
  const hot      = matchCount >= 4 || /quiero|contratar|necesito ya/.test(allText);
  const wantsApt = /reuni[oó]n|llamar|agendar|cita/.test(allText);

  return {
    lead_quality: hot ? "caliente" : "tibio",
    intent:       wantsApt ? "agendar" : "info",
    source:       "keyword_fallback",
  };
}

function parseLLMTag(fullText: string): Classification | null {
  const match = fullText.match(META_REGEX);
  if (!match) return null;

  let parsed: { lead_quality?: unknown; intent?: unknown };
  try {
    parsed = JSON.parse(match[1]);
  } catch {
    return null;
  }

  const q = String(parsed.lead_quality ?? "").toLowerCase();
  const i = String(parsed.intent ?? "").toLowerCase();

  if (!VALID_QUALITY.includes(q as LeadQuality)) return null;
  if (!VALID_INTENT.includes(i as LeadIntent))   return null;

  return {
    lead_quality: q as LeadQuality,
    intent:       i as LeadIntent,
    source:       "llm_tag",
  };
}

function notifyN8N(messages: ChatMessage[], classification: Classification) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) return;

  const userMessages = messages.filter((m) => m.role === "user");

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source:         "web_chat",
      timestamp:      new Date().toISOString(),
      classification,
      messageCount:   messages.length,
      firstMessage:   userMessages[0]?.content || "",
      lastMessage:    userMessages[userMessages.length - 1]?.content || "",
      conversation:   messages.slice(-10),
    }),
  }).catch(() => {});
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Servicio no disponible" }, { status: 503 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Mensajes requeridos" }, { status: 400 });
  }

  const sanitized = messages.slice(-MAX_MESSAGES).map((m) => ({
    role:    m.role === "user" ? ("user" as const) : ("assistant" as const),
    content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
  }));

  const groqResponse = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model:       MODEL,
      messages:    [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
      stream:      true,
      temperature: TEMPERATURE,
      max_tokens:  MAX_TOKENS,
    }),
  });

  if (!groqResponse.ok) {
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: groqResponse.status }
    );
  }

  const reader  = groqResponse.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let sseBuffer    = "";       // buffer de chunks SSE crudos sin completar
      let fullText     = "";       // texto completo del LLM (incluye tag meta)
      let stalled      = "";       // texto pendiente de envío (por si marker viene partido)
      let metaReached  = false;    // ya pasamos el marker, no enviar más al cliente

      const HOLDBACK = META_MARKER.length;

      function pushContent(content: string) {
        fullText += content;
        if (metaReached) return; // todo lo posterior al marker se descarta del stream

        stalled += content;
        const idx = stalled.indexOf(META_MARKER);
        if (idx !== -1) {
          // Marker encontrado: liberar lo previo, marcar y descartar resto
          const safe = stalled.slice(0, idx).replace(/\s+$/, "");
          if (safe) controller.enqueue(encoder.encode(safe));
          metaReached = true;
          stalled     = "";
          return;
        }

        // Marker NO encontrado: liberar todo menos los últimos HOLDBACK chars
        // (por si el marker viene partido entre chunks)
        if (stalled.length > HOLDBACK) {
          const releaseLen = stalled.length - HOLDBACK;
          const release    = stalled.slice(0, releaseLen);
          stalled          = stalled.slice(releaseLen);
          controller.enqueue(encoder.encode(release));
        }
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          sseBuffer += decoder.decode(value, { stream: true });
          const lines = sseBuffer.split("\n");
          sseBuffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;
            if (!trimmed.startsWith("data: ")) continue;

            try {
              const json    = JSON.parse(trimmed.slice(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) pushContent(content);
            } catch {
              // chunk malformado, ignorar
            }
          }
        }
      } finally {
        // Si nunca llegamos al marker, liberar el resto al cliente
        if (!metaReached && stalled) {
          controller.enqueue(encoder.encode(stalled));
        }
        controller.close();

        // Clasificación + notificación N8N (después del cierre del stream)
        const classification =
          parseLLMTag(fullText) ?? classifyByKeywords(sanitized);

        if (classification && classification.lead_quality !== "curioso") {
          notifyN8N(sanitized, classification);
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
