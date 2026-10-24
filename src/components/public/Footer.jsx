import { Link } from "react-router-dom";
import { categories } from "../../data/courses";

const socials = [
  { icon: "ri-facebook-fill", label: "Facebook", url: "https://www.facebook.com" },
  { icon: "ri-instagram-line", label: "Instagram", url: "https://www.instagram.com" },
  { icon: "ri-linkedin-fill", label: "LinkedIn", url: "https://www.linkedin.com" },
  { icon: "ri-youtube-line", label: "YouTube", url: "https://www.youtube.com" },
];

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Courses", path: "/courses" },
  { name: "Contact", path: "/contact" },
  { name: "Login", path: "/login" },
  { name: "Sign Up", path: "/signup" },
];

const contacts = [
  { icon: "ri-mail-line", label: "Email", value: "hello@makeyourowncourse.com", href: "mailto:hello@makeyourowncourse.com" },
  { icon: "ri-phone-line", label: "Phone", value: "+91 0000000000", href: "tel:+910000000000" },
  { icon: "ri-map-pin-line", label: "Location", value: "India" },
];

const linkClass = "font-inter text-sm text-gray-400 transition hover:text-primary";

function Footer() {
  return (
    <footer className="bg-[#10131d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="font-inter text-2xl font-bold">
              Make <span className="italic text-primary">Your Own</span> Course
            </Link>
            <p className="mt-5 max-w-xs font-inter text-sm leading-7 text-gray-400">
              Learn practical skills, build real projects, and grow your career with courses designed for your future.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition hover:-translate-y-0.5 hover:bg-primary hover:text-white"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-inter text-sm font-semibold text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={linkClass}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-inter text-sm font-semibold text-white">Popular Categories</h3>
            <ul className="mt-5 space-y-3">
              {categories.slice(0, 5).map((category) => (
                <li key={category.name}>
                  <Link to={`/courses?category=${encodeURIComponent(category.name)}`} className={linkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-inter text-sm font-semibold text-white">Get In Touch</h3>
            <div className="mt-5 space-y-4">
              {contacts.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <p className="font-inter text-xs text-gray-500">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="mt-1 block font-inter text-sm text-gray-300 hover:text-primary">
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 font-inter text-sm text-gray-300">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-center font-inter text-xs text-gray-500 md:text-left">
            © {new Date().getFullYear()} Make Your Own Course. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="font-inter text-xs text-gray-500 transition hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="font-inter text-xs text-gray-500 transition hover:text-primary">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
