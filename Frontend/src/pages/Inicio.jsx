import { useEffect } from "react";
import HeroSection from "../components/Inicio/HeroSection";
import Caracteristicas from "../components/inicio/Caracteristicas";
import CTASection from "../components/inicio/CTASection";
import PreguntasFrecuentes from "../components/inicio/PreguntasFrecuentes";
import ReseñasDestacadas from "../components/inicio/ReseñasDestacadas";

const Inicio = () => {
  useEffect(() => {
    document.title = "Red-Fi | Inicio";
  }, []);
  return (
    <div className="w-full">
      <HeroSection />
      <Caracteristicas />
      <PreguntasFrecuentes />
      <ReseñasDestacadas />
      <CTASection />
    </div>
  );
};

export default Inicio;
