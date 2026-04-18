import { SYSTEM_PROMPT } from "@/lib/constants";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 500;

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Servicio no disponible" },
      { status: 503 }
    );
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
    role: m.role === "user" ? ("user" as const) : ("assistant" as const),
    content: String(m.content).slice(0, MAX_MESSAGE_LENGTH),
  }));

  const groqResponse = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...sanitized],
      stream: true,
      temperature: 0.7,
      max_tokens: 400,
    }),
  });

  if (!groqResponse.ok) {
    return Response.json(
      { error: "Error al procesar la solicitud" },
      { status: groqResponse.status }
    );
  }

  const reader = groqResponse.body!.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;
            if (!trimmed.startsWith("data: ")) continue;

            try {
              const json = JSON.parse(trimmed.slice(6));
              const content = json.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            } catch {
              // Skip malformed chunks
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
