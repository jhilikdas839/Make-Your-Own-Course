// Gradient cover used on student course cards.
function CourseCover({ icon, label, title, height = "h-40" }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-primary/80 to-primary/20 p-5 ${height}`}>
      <div className="absolute -bottom-14 -right-12 h-44 w-44 rounded-full bg-white/20 transition duration-500 group-hover:scale-110"></div>
      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/60">
          <i className={`${icon} text-2xl`}></i>
        </div>
        {label && <span className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-medium">{label}</span>}
      </div>
      {title && <p className="absolute bottom-5 left-5 text-lg font-semibold">{title}</p>}
    </div>
  );
}

export default CourseCover;
