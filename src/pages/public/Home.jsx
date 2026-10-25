import { Link } from "react-router-dom";
import CourseCom from "../../components/public/CourseCom";
import About from "../../components/public/About";
import WhyChooseUs from "../../components/public/WhyChooseUs";
import Categories from "../../components/public/Categories";
import Testimonials from "../../components/public/Testimonials";
import PopularInstructors from "../../components/public/PopularInstructors";
import LearningProcess from "../../components/public/LearningProcess";
import CTA from "../../components/public/CTA";
import { instructors } from "../../data/instructors";
import SafeImage from "../../components/common/SafeImage";

function Home() {
  return (
    <section className="min-h-screen bg-[#f8f8f5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HERO ================= */}
        <div className="relative flex min-h-[520px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-white text-center">
          {/* Left decoration */}
          <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex md:left-12">
            <div className="h-8 w-8 rounded-lg border border-gray-200 md:h-11 md:w-11"></div>
            <div className="h-8 w-8 rounded-lg bg-primary md:h-11 md:w-11"></div>
            <div className="h-8 w-8 rounded-lg border border-gray-200 md:h-11 md:w-11"></div>
            <div className="h-8 w-8 rounded-lg bg-yellow-400 md:h-11 md:w-11"></div>
          </div>

          {/* Right decoration */}
          <div className="absolute right-5 top-1/2 hidden -translate-y-1/2 flex-col gap-3 sm:flex md:right-12">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg border border-gray-200 md:h-11 md:w-11"></div>
              <div className="h-8 w-8 rounded-lg border border-gray-200 md:h-11 md:w-11"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary md:h-11 md:w-11"></div>
              <div className="h-8 w-8 rounded-lg border border-gray-200 md:h-11 md:w-11"></div>
            </div>
            <div className="ml-8 h-8 w-8 rounded-lg bg-yellow-400 md:h-11 md:w-11"></div>
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-3xl animate-fade-up px-6">
            <p className="mb-5 text-sm font-medium text-primary md:text-base">Learn • Build • Grow</p>

            <h1 className="font-inter text-4xl font-bold leading-[0.95] tracking-tight text-[#10131d] sm:text-5xl md:text-6xl lg:text-7xl">
              One place for all
              <span className="block">your learning</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-600 md:text-lg">
              Learn new skills, build your career, and grow with practical courses designed to help you move forward.
            </p>

            <Link
              to="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#10131d] px-7 py-3.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-1 hover:bg-primary md:text-base"
            >
              Explore Courses
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>

        {/* ================= BOTTOM CARDS ================= */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-primary p-6">
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="relative z-10">
              <p className="text-3xl font-bold text-white md:text-4xl">500+</p>
              <p className="mt-2 text-sm text-white/80">Courses available</p>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="mb-2 flex justify-between text-xs text-white/80">
                <span>Learning Progress</span>
                <span>85%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20">
                <div className="h-2 w-[85%] rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          <div className="min-h-[220px] rounded-2xl bg-[#11141f] p-6 text-white">
            <p className="text-2xl font-semibold leading-tight md:text-3xl">
              Build the skills
              <br />
              you want.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <Link
                to="/courses?category=Web%20Development"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition hover:bg-primary hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                  <i className="ri-code-line"></i>
                </span>
                Web Development
              </Link>
              <Link
                to="/courses?category=UI%20%2F%20UX%20Design"
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition hover:bg-primary hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
                  <i className="ri-palette-line"></i>
                </span>
                Design
              </Link>
            </div>
          </div>

          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-yellow-400 p-6">
            <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-black/10"></div>
            <div className="relative z-10">
              <p className="max-w-xs text-2xl font-semibold leading-tight text-[#11141f] md:text-3xl">
                Learn from
                <br />
                industry experts.
              </p>
              <div className="mt-7 flex -space-x-3">
                {instructors.map((instructor) => (
                  <SafeImage
                    key={instructor.id}
                    src={instructor.image}
                    alt={instructor.name}
                    icon="ri-user-line"
                    className="h-10 w-10 rounded-full border-2 border-yellow-400 object-cover text-[0px]"
                  />
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 bg-white text-xs font-semibold text-black">
                  +20
                </div>
              </div>
              <Link
                to="/signup"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-black hover:text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CourseCom />
      <About />
      <WhyChooseUs />
      <Categories />
      <PopularInstructors />
      <Testimonials />
      <LearningProcess />
      <CTA />
    </section>
  );
}

export default Home;
