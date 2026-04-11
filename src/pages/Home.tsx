import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contact/ContactSection";
import HeroSection from "../components/home/HeroSection";
import Footer from "../components/layout/Footer";
import ProjectsSection from "../components/projects/ProjectsSection";
import SkillsSection from "../components/skills/SkillsSection";

function Home() {
  return (
    <main className="home-page">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default Home;
