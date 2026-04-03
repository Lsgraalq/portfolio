import Image from "next/image";
import HeroSection from '@/components/HeroSection';
import ContactSection from '@/components/ContactSection';
import WhyMe from "@/components/WhyMeSection";
import ProjectsSection from "@/components/ProjectsSection";


export default function Home() {
  return (

    <>
     <HeroSection></HeroSection>
     <div className="h-[130vh] md:h-screen"></div>
     <ProjectsSection></ProjectsSection>
     <WhyMe></WhyMe>
      <ContactSection></ContactSection>
      <div className="h-[130vh] md:h-screen"></div>
    </>
  );
}
