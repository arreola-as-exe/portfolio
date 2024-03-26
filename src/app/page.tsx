import Background from "@/components/background";
import ContactSection from "@/components/sections/Contact";
import MainBannerSection from "@/components/sections/MainBanner";
import ProjectsSection from "@/components/sections/Projects";

export default function Home() {
  return (
    <main>
      <Background />
      <MainBannerSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
