import Navbar from "./components/Navbar";
import CinematicScroll from "./components/CinematicScroll";
import ProjectsSection from "./components/ProjectsSection";
import ChatSection from "./components/ChatSection";
import Footer from "./components/Footer";
import PageWrapper from "./components/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main>
        <Navbar />

        {/* Single unified cinematic section: Hero → About → Skills → Experience */}
        <CinematicScroll />

        {/* ProjectsSection & rest — higher z-index, slides over */}
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
