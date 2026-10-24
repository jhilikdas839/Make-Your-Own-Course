import PageHero from "../../components/public/PageHero";
import About from "../../components/public/About";
import WhyChooseUs from "../../components/public/WhyChooseUs";
import LearningProcess from "../../components/public/LearningProcess";
import Testimonials from "../../components/public/Testimonials";
import CTA from "../../components/public/CTA";

function AboutPage() {
  return (
    <div className="bg-[#f8f8f5]">
      <PageHero
        eyebrow="ABOUT US"
        title="Learning that"
        subtitle="fits your life."
        text="Make Your Own Course brings practical courses, live classes and expert mentors together, so you can learn the skills you need at your own pace."
      />
      <div className="px-4 md:px-8">
        <About />
        <WhyChooseUs />
        <LearningProcess />
        <Testimonials />
        <CTA />
      </div>
    </div>
  );
}

export default AboutPage;
