// Dark banner used at the top of simple public pages (About, Contact, Legal...).
function PageHero({ eyebrow, title, subtitle, text }) {
  return (
    <section className="px-4 pt-8 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#10131d] px-6 py-14 md:px-12 md:py-16">
        <div className="absolute right-10 top-10 h-14 w-14 rounded-xl border border-white/10"></div>
        <div className="absolute right-28 top-24 h-8 w-8 animate-float rounded-lg bg-primary"></div>
        <div className="absolute bottom-10 right-12 h-10 w-10 rounded-lg bg-yellow-400"></div>

        <div className="relative z-10 max-w-3xl animate-fade-up">
          <p className="mb-4 font-inter text-sm font-medium text-primary">{eyebrow}</p>
          <h1 className="font-inter text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {title}
            {subtitle && <span className="block text-gray-400">{subtitle}</span>}
          </h1>
          {text && <p className="mt-5 max-w-2xl font-inter text-base leading-7 text-gray-400 md:text-lg">{text}</p>}
        </div>
      </div>
    </section>
  );
}

export default PageHero;
