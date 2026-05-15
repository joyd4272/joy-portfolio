import Header from "@/components/Header";
import Hero from "@/components/HeroLoader";
import Marquee from "@/components/Marquee";
import Stats from "@/components/StatsLoader";
import Skills from "@/components/SkillsLoader";
import Journey from "@/components/JourneyLoader";
import Projects from "@/components/Projects";
import KitAndHuman from "@/components/KitAndHuman";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Skills />
        <Journey />
        <Projects />
        <KitAndHuman />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
