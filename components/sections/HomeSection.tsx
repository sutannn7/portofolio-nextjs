import Hero from "./home/Hero";
import ProjectsPreview from "./home/ProjectsPreview";
import Steps from "./home/Steps";
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
