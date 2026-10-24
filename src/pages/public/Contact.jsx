import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/public/PageHero";
import { useContactMessages } from "../../hooks/usePlatformData";
import { inputClass, labelClass } from "../../components/common/formStyles";

const contactItems = [
  { icon: "ri-mail-line", label: "Email", value: "hello@makeyourowncourse.com", href: "mailto:hello@makeyourowncourse.com" },
  { icon: "ri-phone-line", label: "Phone", value: "+91 0000000000", href: "tel:+910000000000" },
  { icon: "ri-map-pin-line", label: "Location", value: "India" },
  { icon: "ri-time-line", label: "Working Hours", value: "Mon - Fri, 9:00 AM - 6:00 PM" },
];

const socials = [
  { icon: "ri-facebook-fill", label: "Facebook", url: "https://www.facebook.com" },
  { icon: "ri-instagram-line", label: "Instagram", url: "https://www.instagram.com" },
  { icon: "ri-linkedin-fill", label: "LinkedIn", url: "https://www.linkedin.com" },
  { icon: "ri-youtube-line", label: "YouTube", url: "https://www.youtube.com" },
];

const emptyForm = { name: "", email: "", subject: "", message: "", agree: false };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email address.";
  if (!form.subject.trim()) errors.subject = "Add a subject.";
  if (form.message.trim().length < 10) errors.message = "Write at least 10 characters.";
  if (!form.agree) errors.agree = "Please accept to receive a reply.";
  return errors;
}

function Contact() {
  const [, setMessages] = useContactMessages();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setMessages((prev) => [
      { id: Date.now(), name: form.name, email: form.email, subject: form.subject, message: form.message, date: new Date().toISOString().slice(0, 10), read: false },
      ...prev,
    ]);
    setForm(emptyForm);
    setSent(true);
  };

  const field = (name) => `${inputClass} ${errors[name] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`;
  const errorText = (name) => errors[name] && <p className="mt-1.5 text-xs text-red-500">{errors[name]}</p>;

  return (
    <div className="min-h-screen bg-[#f8f8f5]">
      <PageHero
        eyebrow="GET IN TOUCH"
        title="Let's start a"
        subtitle="conversation."
        text="Have a question about a course, need help with your account, or simply want to know more about us? We'd love to hear from you."
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Info */}
          <div className="rounded-3xl bg-[#10131d] p-7 text-white md:p-9 lg:col-span-2">
            <p className="font-inter text-sm font-medium text-primary">CONTACT INFORMATION</p>
            <h2 className="mt-3 font-inter text-2xl font-bold md:text-3xl">We're here to help.</h2>
            <p className="mt-4 font-inter text-sm leading-7 text-gray-400">
              Reach out to us whenever you need help. Our team will get back to you as soon as possible.
            </p>

            <div className="mt-10 space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg text-primary">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <p className="font-inter text-xs text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block font-inter text-sm text-gray-200 hover:text-primary">{item.value}</a>
                    ) : (
                      <p className="mt-1 font-inter text-sm text-gray-200">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="font-inter text-sm text-gray-400">Follow us</p>
              <div className="mt-4 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:bg-primary hover:text-white"
                  >
                    <i className={social.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 md:p-10 lg:col-span-3">
            {sent ? (
              <div className="flex h-full animate-scale-in flex-col items-center justify-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                  <i className="ri-mail-check-line text-3xl text-green-500"></i>
                </div>
                <h2 className="mt-5 text-2xl font-bold">Message sent</h2>
                <p className="mt-2 max-w-sm text-gray-500">Thanks for reaching out. We usually reply within one working day.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium hover:bg-gray-50"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="mb-2 font-inter text-sm font-medium text-primary">SEND A MESSAGE</p>
                  <h2 className="font-inter text-2xl font-bold text-[#10131d] md:text-3xl">How can we help?</h2>
                  <p className="mt-2 font-inter text-sm text-gray-500">Fill out the form below and we'll get back to you.</p>
                </div>

                <form onSubmit={submit} noValidate className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name</label>
                      <input id="name" name="name" value={form.name} onChange={update} placeholder="Your name" className={field("name")} />
                      {errorText("name")}
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address</label>
                      <input id="email" name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" className={field("email")} />
                      {errorText("email")}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className={labelClass}>Subject</label>
                    <input id="subject" name="subject" value={form.subject} onChange={update} placeholder="What is this about?" className={field("subject")} />
                    {errorText("subject")}
                  </div>
                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <textarea id="message" name="message" rows={5} value={form.message} onChange={update} placeholder="Write your message..." className={`${field("message")} resize-none`} />
                    {errorText("message")}
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                      <input type="checkbox" name="agree" checked={form.agree} onChange={update} className="mt-0.5 h-4 w-4 accent-[#118BE9]" />
                      I agree to receive a response regarding my message.
                    </label>
                    {errorText("agree")}
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#10131d] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-primary active:scale-[0.98]"
                  >
                    Send Message
                    <i className="ri-send-plane-line"></i>
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-7xl flex-col items-start justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-7 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">Looking for quick answers?</h3>
            <p className="mt-1 text-sm text-gray-500">Check our courses and find what you're looking for.</p>
          </div>
          <Link to="/courses" className="rounded-xl bg-[#10131d] px-5 py-3 text-sm font-medium text-white hover:bg-primary">
            Browse Courses
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;
