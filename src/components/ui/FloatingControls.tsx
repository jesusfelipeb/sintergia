"use client";

import { useEffect, useState } from "react";
import FloatingChatWidget from "./FloatingChatWidget";
import FloatingWhatsApp from "./FloatingWhatsApp";

/**
 * Coordina los dos botones flotantes para que no se monten visualmente:
 * - Chat agent (cyan, bottom-right)
 * - WhatsApp directo (verde, bottom-left)
 *
 * En MOBILE, cuando el chat widget está expandido (bottom-sheet ~85vh)
 * ocultamos el botón de WhatsApp para evitar competencia visual.
 * En DESKTOP ambos quedan visibles porque el chat es un panel lateral.
 *
 * También escucha el evento "sintergia:open-chat" para que botones de
 * cualquier parte del site (ej: el CTA "Probar el agente" del Hero) puedan
 * abrir el chat sin tener que pasar refs.
 */
export default function FloatingControls() {
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setChatOpen(true);
    window.addEventListener("sintergia:open-chat", onOpen);
    return () => window.removeEventListener("sintergia:open-chat", onOpen);
  }, []);

  return (
    <>
      <FloatingChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      <FloatingWhatsApp hideOnMobileChatOpen={chatOpen} />
    </>
  );
}
