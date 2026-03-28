import Navbar from "./components/Navbar";
import HeroAboutSection from "./components/HeroAboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ChatSection from "./components/ChatSection";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main>
        <Navbar />
        <HeroAboutSection />

        <SkillsSection />
        <ExperienceSection />

        {/* ProjectsSection & rest — higher z-index, slides over the sticky Experience content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              borderRadius: "2rem 2rem 0 0",
              overflow: "hidden",
              boxShadow: "0 -24px 60px rgba(0,0,0,0.7)",
              marginTop: "-100vh",
            }}
          >
            <ProjectsSection />
          </div>
          <ChatSection />
          <Footer />
        </div>
      </main>
    </PageWrapper>
  );
}
