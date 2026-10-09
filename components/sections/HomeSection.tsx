import Hero from "@/components/sections/home/Hero";
import ProjectsPreview from "@/components/sections/home/ProjectsPreview";
import Steps from "@/components/sections/home/Steps";
import ContactCta from "@/components/sections/home/ContactCta";
import Footer from "@/components/Footer";

export default function HomeSection() {
  return (
    <>
      <Hero />
      <ProjectsPreview />
      <Steps />
      <ContactCta />
      <Footer />
    </>
  );
}
