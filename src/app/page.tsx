import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Problema from "@/components/sections/Problema";
import ComoFunciona from "@/components/sections/ComoFunciona";
import OtrosServicios from "@/components/sections/OtrosServicios";
import Casos from "@/components/sections/Casos";
import Planes from "@/components/sections/Planes";
import AgentSection from "@/components/sections/AgentSection";
import CTAFinal from "@/components/sections/CTAFinal";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Problema />
      <ComoFunciona />
      <OtrosServicios />
      <Casos />
      <Planes />
      <AgentSection />
      <CTAFinal />
      <Footer />
    </>
  );
}
