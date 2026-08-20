import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#f8f8f5]">

      {/* ================= HERO ================= */}

      <section className="px-4 md:px-8 pt-8">

        <div className="max-w-7xl mx-auto bg-[#10131d] rounded-3xl px-6 py-14 md:px-12 md:py-16 relative overflow-hidden">

          {/* Decorative Shapes */}

          <div className="absolute top-10 right-10 w-14 h-14 border border-white/10 rounded-xl"></div>

          <div className="absolute top-24 right-28 w-8 h-8 bg-primary rounded-lg"></div>

          <div className="absolute bottom-10 right-12 w-10 h-10 bg-yellow-400 rounded-lg"></div>


          {/* Content */}

          <div className="relative z-10 max-w-3xl">

            <p className="text-primary text-sm font-medium font-inter mb-4">
              GET IN TOUCH
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight font-inter">
              Let's start a
              <span className="block text-gray-400">
                conversation.
              </span>
            </h1>

            <p className="mt-5 text-gray-400 text-base md:text-lg leading-7 max-w-2xl font-inter">
              Have a question about a course, need help with your
              account, or simply want to know more about us?
              We'd love to hear from you.
            </p>

          </div>

        </div>

      </section>


      {/* ================= CONTACT SECTION ================= */}

      <section className="px-4 md:px-8 py-16">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">


          {/* ================= LEFT SIDE ================= */}

          <div className="lg:col-span-2 bg-[#10131d] rounded-3xl p-7 md:p-9 text-white">

            <p className="text-primary text-sm font-medium font-inter">
              CONTACT INFORMATION
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-3 font-inter">
              We're here to help.
            </h2>

            <p className="mt-4 text-gray-400 leading-7 text-sm font-inter">
              Reach out to us whenever you need help. Our team
              will get back to you as soon as possible.
            </p>


            {/* Contact Items */}

            <div className="mt-10 space-y-6">


              {/* Email */}

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/5 text-primary flex items-center justify-center text-lg">
                  <i className="ri-mail-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-gray-200 font-inter">
                    hello@makeyourowncourse.com
                  </p>

                </div>

              </div>


              {/* Phone */}

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/5 text-primary flex items-center justify-center text-lg">
                  <i className="ri-phone-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-gray-200 font-inter">
                    +91 0000000000
                  </p>

                </div>

              </div>


              {/* Location */}

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/5 text-primary flex items-center justify-center text-lg">
                  <i className="ri-map-pin-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-gray-200 font-inter">
                    India
                  </p>

                </div>

              </div>


              {/* Working Hours */}

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/5 text-primary flex items-center justify-center text-lg">
                  <i className="ri-time-line"></i>
                </div>

                <div>

                  <p className="text-xs text-gray-500 font-inter">
                    Working Hours
                  </p>

                  <p className="mt-1 text-sm text-gray-200 font-inter">
                    Mon - Fri, 9:00 AM - 6:00 PM
                  </p>

                </div>

              </div>

            </div>


            {/* Social Links */}

            <div className="mt-10 pt-7 border-t border-white/10">

              <p className="text-sm text-gray-400 font-inter">
                Follow us
              </p>

              <div className="flex gap-3 mt-4">

                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
                >
                  <i className="ri-facebook-fill"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
                >
                  <i className="ri-instagram-line"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>

                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition"
                >
                  <i className="ri-youtube-line"></i>
                </a>

              </div>

            </div>

          </div>


          {/* ================= RIGHT SIDE FORM ================= */}

          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-7 md:p-10">

            <div className="mb-8">

              <p className="text-primary text-sm font-medium font-inter mb-2">
                SEND A MESSAGE
              </p>

              <h2 className="text-3xl font-bold text-[#10131d] font-inter">
                How can we help?
              </h2>

              <p className="mt-2 text-gray-500 text-sm font-inter">
                Fill out the form below and we'll get back to you.
              </p>

            </div>


            {/* Form */}

            <form className="space-y-5">


              {/* Name + Email */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">


                {/* Name */}

                <div>

                  <label className="block text-sm font-medium text-[#10131d] mb-2 font-inter">
                    Full Name
                  </label>

                  <div className="relative">

                    <i className="ri-user-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-[#f8f8f5] border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                  </div>

                </div>


                {/* Email */}

                <div>

                  <label className="block text-sm font-medium text-[#10131d] mb-2 font-inter">
                    Email Address
                  </label>

                  <div className="relative">

                    <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-[#f8f8f5] border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />

                  </div>

                </div>

              </div>


              {/* Subject */}

              <div>

                <label className="block text-sm font-medium text-[#10131d] mb-2 font-inter">
                  Subject
                </label>

                <div className="relative">

                  <i className="ri-chat-3-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>

                  <input
                    type="text"
                    placeholder="What would you like to talk about?"
                    className="w-full bg-[#f8f8f5] border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none text-sm font-inter transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />

                </div>

              </div>


              {/* Message */}

              <div>

                <label className="block text-sm font-medium text-[#10131d] mb-2 font-inter">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full bg-[#f8f8f5] border border-gray-200 rounded-xl py-3.5 px-4 outline-none text-sm font-inter resize-none transition focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10"
                ></textarea>

              </div>


              {/* Checkbox */}

              <div className="flex items-start gap-2">

                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 accent-primary"
                />

                <p className="text-xs text-gray-500 font-inter">
                  I agree to receive a response regarding my message.
                </p>

              </div>


              {/* Button */}

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#10131d] text-white px-7 py-3.5 rounded-xl font-medium font-inter transition duration-300 hover:bg-primary hover:-translate-y-0.5"
              >
                Send Message

                <i className="ri-arrow-right-line"></i>
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* ================= FAQ CTA ================= */}

      <section className="px-4 md:px-8 pb-20">

        <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
              <i className="ri-question-line"></i>
            </div>

            <div>

              <h3 className="text-xl font-semibold text-[#10131d] font-inter">
                Looking for quick answers?
              </h3>

              <p className="mt-1 text-sm text-gray-500 font-inter">
                Check our courses and find what you're looking for.
              </p>

            </div>

          </div>


          <button
            type="button"
            className="inline-flex items-center gap-2 bg-[#10131d] text-white px-6 py-3 rounded-xl text-sm font-medium font-inter hover:bg-primary transition"
          >
            Browse Courses
            <i className="ri-arrow-right-line"></i>
          </button>

        </div>

      </section>

    </div>
  );
};

export default Contact;