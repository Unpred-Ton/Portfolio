import { SceneRoot } from "@/components/three/SceneRoot";
import { Hero } from "@/components/sections/Hero";
import { Arc } from "@/components/sections/Arc";
import { Flagship } from "@/components/sections/Flagship";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { HowIWork } from "@/components/sections/HowIWork";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <SceneRoot />
      <main id="main">
        <Hero />
        <Arc />
        <Flagship />
        <Projects />
        <Skills />
        <HowIWork />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
