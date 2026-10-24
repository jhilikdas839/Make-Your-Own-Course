import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroStudent from "../../assets/hero-student.webp";
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

const popularSearches = ["React", "Python", "UI/UX", "Data Science"];

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const search = (term) => {
    const value = term.trim();
    navigate(value ? `/courses?search=${encodeURIComponent(value)}` : "/courses");
  };

  return (
    <section className="min-h-screen bg-[#f8f8f5] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HERO ================= */}
        <div className="relative grid min-h-[540px] items-center gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 pt-12 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:pt-0">
          {/* Text */}
          <div className="relative z-10 max-w-xl animate-fade-up lg:py-16">
            <p className="mb-5 text-sm font-medium text-primary md:text-base">Learn • Build • Grow</p>

            <h1 className="font-inter text-4xl font-bold leading-[0.95] tracking-tight text-[#10131d] sm:text-5xl md:text-6xl lg:text-7xl">
              One place for all
              <span className="block">your learning</span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-600 md:text-lg">
              Learn new skills, build your career, and grow with practical courses designed to help you move forward.
            </p>

            {/* Search */}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                search(query);
              }}
              className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"
            >
              <i className="ri-search-line pl-3 text-lg text-gray-400"></i>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="What do you want to learn?"
                aria-label="Search courses"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none md:text-base"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#10131d] px-5 py-3 text-sm font-medium text-white transition hover:bg-primary"
              >
                Search
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-gray-400">Popular:</span>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => search(term)}
                  className="rounded-full border border-gray-200 px-3 py-1 text-gray-600 transition hover:border-primary hover:text-primary"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative flex h-full min-h-[320px] items-end justify-center">
            <div className="absolute bottom-0 h-[78%] w-[88%] rounded-t-[200px] bg-primary"></div>
            <div className="absolute bottom-[18%] left-[6%] h-10 w-10 rounded-lg bg-yellow-400"></div>
            <div className="absolute right-[4%] top-[14%] h-11 w-11 rounded-lg border border-gray-200"></div>

            <img
              src={heroStudent}
              alt="Happy student celebrating"
              className="relative z-10 w-[88%] max-w-[440px] animate-fade-in object-contain"
            />

            <div className="absolute left-0 top-[22%] z-20 flex animate-float items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <i className="ri-book-open-line text-lg text-primary"></i>
              </span>
              <div>
                <p className="text-sm font-bold text-[#10131d]">500+ courses</p>
                <p className="text-xs text-gray-400">Learn at your pace</p>
              </div>
            </div>

            <div
              className="absolute bottom-[12%] right-0 z-20 flex animate-float items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg"
              style={{ animationDelay: "1.5s" }}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-50">
                <i className="ri-star-fill text-lg text-yellow-400"></i>
              </span>
              <div>
                <p className="text-sm font-bold text-[#10131d]">4.8 rating</p>
                <p className="text-xs text-gray-400">From 20K learners</p>
              </div>
            </div>
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
