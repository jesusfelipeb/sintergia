import { ImageResponse } from "next/og";
import config from "@/lib/config";

/* ─────────────────────────────────────────────────────────────
 * Open Graph image dinámica (1200×630).
 * Server-rendered con next/og en el edge. Se genera estática
 * una vez por build y se sirve cacheada por Vercel.
 *
 * Diseño: navy + aurora cyan/purple + highlight cyan rotado
 * en palabra clave (signatura visual v3).
 * ──────────────────────────────────────────────────────────── */

export const runtime = "edge";
export const alt = `${config.business.name} — ${config.business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#040b16",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
          padding: "72px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Aurora blobs */}
        <div
          style={{
            position: "absolute",
            top: "-180px",
            left: "200px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,180,216,0.45) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            right: "-100px",
            width: "650px",
            height: "650px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.40) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Dot grid sutil */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(248,250,252,0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Header: badge mono */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(248,250,252,0.12)",
            background: "rgba(15,24,48,0.6)",
            backdropFilter: "blur(12px)",
            fontSize: "18px",
            fontFamily: "monospace",
            color: "#94a3b8",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22C55E",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#F8FAFC" }}>SINTERGIA · STUDIO</span>
          <span
            style={{
              width: "1px",
              height: "18px",
              background: "rgba(248,250,252,0.2)",
              display: "inline-block",
            }}
          />
          <span>Aceptando proyectos</span>
        </div>

        {/* H1 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "108px",
            lineHeight: "1.02",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            marginTop: "auto",
            marginBottom: "32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex" }}>Su negocio,</div>
          <div style={{ display: "flex", alignItems: "center", marginTop: "12px" }}>
            <span
              style={{
                background: "#00b4d8",
                color: "#040b16",
                padding: "4px 24px",
                transform: "rotate(-1deg)",
                borderRadius: "8px",
                fontWeight: 600,
              }}
            >
              atendiendo
            </span>
            <span
              style={{
                color: "#94a3b8",
                fontStyle: "italic",
                fontWeight: 300,
                marginLeft: "20px",
              }}
            >
              mientras
            </span>
          </div>
          <div style={{ display: "flex", marginTop: "12px" }}>usted descansa.</div>
        </div>

        {/* Subtítulo */}
        <div
          style={{
            display: "flex",
            fontSize: "28px",
            color: "#94a3b8",
            maxWidth: "820px",
            lineHeight: "1.4",
            position: "relative",
            zIndex: 1,
          }}
        >
          Bots de WhatsApp con IA que responden, agendan y venden por usted. 24/7.
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "48px",
            fontFamily: "monospace",
            fontSize: "20px",
            color: "#94a3b8",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span style={{ color: "#F8FAFC" }}>sintergia.com</span>
          <span>Buenos Aires → LATAM</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
