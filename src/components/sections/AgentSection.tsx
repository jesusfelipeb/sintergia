import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Chat from "@/components/ui/Chat";

export default function AgentSection() {
  return (
    <Section id="agente" alt>
      <SectionHeading
        title="Pregúntele a nuestro agente"
        subtitle="Este es el mismo tipo de asistente que podemos crear para su negocio. Pruébelo ahora."
      />
      <Chat />
    </Section>
  );
}
