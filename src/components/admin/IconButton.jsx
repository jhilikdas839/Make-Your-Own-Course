const TONES = {
  default: "text-gray-500 hover:bg-gray-100 hover:text-[#10131d]",
  green: "text-green-600 hover:bg-green-50",
  red: "text-red-500 hover:bg-red-50",
  blue: "text-primary hover:bg-primary/10",
};

// Small square icon button used in table action columns.
function IconButton({ icon, label, onClick, tone = "default", disabled }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 transition disabled:cursor-not-allowed disabled:opacity-40 ${TONES[tone]}`}
    >
      <i className={icon}></i>
    </button>
  );
}

export default IconButton;
