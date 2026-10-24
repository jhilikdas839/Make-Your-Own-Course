function ProgressBar({ value, className = "" }) {
  return (
    <div className={`h-2 overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;
