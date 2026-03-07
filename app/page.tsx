import Navbar from "./components/Navbar";
import HeroAboutSection from "./components/HeroAboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ChatSection from "./components/ChatSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroAboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ChatSection />
      <Footer />
    </main>
  );
}
