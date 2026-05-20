import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
} from "baileys";
import qrTerminal from "qrcode-terminal";
import QRCode from "qrcode";
import { createServer } from "http";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;
const FELIPE_NUMBER = "5491132924310@s.whatsapp.net";
const BOT_PORT = parseInt(process.env.BOT_PORT || "3001");

const SYSTEM_PROMPT = `Eres el asistente virtual de Sintergia Studio, una empresa de servicios tecnológicos especializada en chatbots, automatizaciones y páginas web para profesionales y negocios locales en Argentina.

Tu objetivo principal es:
1. Responder preguntas sobre los servicios de Sintergia enfocado principalmente en los Bots de Inteligencia Artificial.
2. Ofrecer servicios complementarios (Sitios Web, E-commerce Tiendanube/Shopify, Automatizaciones) si notas que el usuario los necesita.
3. Identificar las necesidades del visitante y calificar al lead.
4. Cuando detectes interés real de compra, recoger: nombre completo, tipo de negocio, y problema principal. Luego avisar que un asesor se comunicará pronto.

Planes disponibles para Bots:
- Arranque (USD 600 setup + USD 80/mes): Bot básico de WhatsApp con respuestas automáticas.
- Profesional (USD 1.500 setup + USD 120/mes): Bot con IA, agenda de citas, integraciones.
- Integral (USD 3.000 setup + USD 200/mes): Solución completa: bot + landing + automatizaciones + soporte dedicado.

Caso de éxito: Banana Express (verdulería en Palermo) — bot que maneja pedidos y consultas.

Reglas estrictas:
- Responde en español, tono profesional pero cercano. Usa "usted".
- NO menciones Soberanía Total, Bitcoin, Venezuela ni temas filosóficos.
- NO inventes datos ni testimonios.
- Respuestas de 2-4 oraciones máximo. Sé conciso.
- NO ofrezcas descuentos ni modifiques precios.
- Cuando el lead esté calificado, pide: nombre completo, negocio, problema principal.`;

const conversations = new Map();
let currentQR = null;
let botStatus = "disconnected";

function qrPage(qrDataUrl) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="15">
  <title>Sintergia Bot — WhatsApp QR</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #040b16; color: #F8FAFC; font-family: system-ui, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    .card { background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; text-align: center; max-width: 420px; }
    h1 { font-size: 1.25rem; margin-bottom: 0.5rem; }
    .subtitle { color: #94a3b8; font-size: 0.875rem; margin-bottom: 1.5rem; }
    .qr { background: white; border-radius: 12px; padding: 1rem; display: inline-block; margin-bottom: 1rem; }
    .qr img { width: 280px; height: 280px; }
    .steps { color: #94a3b8; font-size: 0.8rem; text-align: left; line-height: 1.6; }
    .steps strong { color: #00b4d8; }
    .connected { color: #22c55e; font-size: 1.1rem; padding: 2rem 0; }
    .dot { display: inline-block; width: 10px; height: 10px; background: #22c55e; border-radius: 50%; margin-right: 8px; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  </style>
</head>
<body>
  <div class="card">
    <h1>Sintergia Bot</h1>
    ${qrDataUrl
      ? `<p class="subtitle">Escanea el QR para conectar WhatsApp</p>
         <div class="qr"><img src="${qrDataUrl}" alt="QR Code"></div>
         <div class="steps">
           <strong>1.</strong> Abrí WhatsApp en tu celular<br>
           <strong>2.</strong> Ajustes → Dispositivos vinculados<br>
           <strong>3.</strong> Vincular un dispositivo → Escanear QR
         </div>`
      : `<div class="connected"><span class="dot"></span>Bot conectado y funcionando</div>`}
  </div>
</body>
</html>`;
}

async function callGroq(messages) {
  if (!GROQ_API_KEY) return "Disculpe, el servicio no está disponible en este momento.";

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 300,
    }),
  });

  if (!res.ok) return "Disculpe, hubo un error procesando su consulta. Intente de nuevo.";

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Disculpe, no pude generar una respuesta.";
}

const LEAD_SIGNALS = [
  "precio", "costo", "cuánto", "cuanto", "presupuesto",
  "contratar", "quiero", "necesito", "interesa",
  "negocio", "empresa", "consultorio", "local",
  "bot", "automatizar", "automatización",
];

function detectLead(messages) {
  const userMsgs = messages.filter((m) => m.role === "user").map((m) => m.content.toLowerCase());
  if (userMsgs.length < 2) return false;
  const text = userMsgs.join(" ");
  return LEAD_SIGNALS.filter((s) => text.includes(s)).length >= 2;
}

function notifyN8N(jid, messages) {
  if (!N8N_WEBHOOK_URL) return;

  const userMsgs = messages.filter((m) => m.role === "user");
  const phone = jid.replace("@s.whatsapp.net", "");

  fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "whatsapp_bot",
      timestamp: new Date().toISOString(),
      phone,
      messageCount: messages.length,
      firstMessage: userMsgs[0]?.content || "",
      lastMessage: userMsgs[userMsgs.length - 1]?.content || "",
      conversation: messages.slice(-10),
    }),
  }).catch(() => {});
}

let httpServer;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");

  let version;
  try {
    const result = await fetchLatestBaileysVersion();
    version = result.version;
    console.log("WA version:", version);
  } catch {
    version = [2, 3000, 1015901307];
    console.log("Using fallback WA version:", version);
  }

  const sock = makeWASocket({
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, undefined),
    },
    version,
    printQRInTerminal: false,
    browser: ["Ubuntu", "Chrome", "22.0"],
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      currentQR = await QRCode.toDataURL(qr, { width: 300, margin: 2 });
      botStatus = "waiting_qr";
      console.log("\n  QR generado → http://localhost:" + BOT_PORT + "/qr\n");
      qrTerminal.generate(qr, { small: true });
    }

    if (connection === "open") {
      currentQR = null;
      botStatus = "connected";
      console.log("\n✅ Bot de WhatsApp conectado y listo!");
    }

    if (connection === "close") {
      const code = lastDisconnect?.error?.output?.statusCode;
      console.log("Conexión cerrada, código:", code);
      if (code !== DisconnectReason.loggedOut) {
        console.log("Reconectando en 5s...");
        setTimeout(startBot, 5000);
      } else {
        console.log("Sesión cerrada. Elimine ./auth y reinicie.");
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages: msgs, type }) => {
    if (type !== "notify") return;

    for (const msg of msgs) {
      if (msg.key.fromMe) continue;
      if (!msg.message) continue;

      const jid = msg.key.remoteJid;
      if (!jid || jid.includes("@g.us")) continue;

      const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        "";
      if (!text.trim()) continue;

      console.log(`📩 ${jid}: ${text}`);

      if (!conversations.has(jid)) conversations.set(jid, []);
      const history = conversations.get(jid);
      history.push({ role: "user", content: text });

      if (history.length > 20) history.splice(0, history.length - 20);

      const reply = await callGroq(history);
      history.push({ role: "assistant", content: reply });

      await sock.sendMessage(jid, { text: reply });
      console.log(`🤖 → ${jid}: ${reply.substring(0, 80)}...`);

      if (detectLead(history)) {
        notifyN8N(jid, history);
      }
    }
  });

  if (!httpServer) {
    httpServer = createServer((req, res) => {
      if (req.url === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: botStatus, connected: sock.user != null }));
      } else if (req.url === "/qr") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(qrPage(currentQR));
      } else {
        res.writeHead(302, { Location: "/qr" });
        res.end();
      }
    });
    httpServer.listen(BOT_PORT, () => {
      console.log(`Panel QR: http://localhost:${BOT_PORT}/qr`);
    });
  }
}

startBot().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
