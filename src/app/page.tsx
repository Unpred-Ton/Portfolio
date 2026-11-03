import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { Flagship } from "@/components/sections/Flagship";
import { AiAutomations } from "@/components/sections/AiAutomations";
import { SukliCo } from "@/components/sections/SukliCo";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Flagship />
        <AiAutomations />
        <SukliCo />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
