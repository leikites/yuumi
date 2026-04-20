import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contact/ContactSection";
import HeroSection from "../components/home/HeroSection";
import Footer from "../components/layout/Footer";
import ProjectsSection from "../components/projects/ProjectsSection";
import WorkExperienceSection from "../components/work-experience/WorkExperienceSection";

function Home() {
  return (
    <main className="home-page">
      <HeroSection />
      <AboutSection />
      <WorkExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default Home;
