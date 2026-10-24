function EmptyState({ icon = "ri-inbox-line", title, text, action }) {
  return (
    <div className="animate-fade-in rounded-2xl border border-gray-200 bg-white p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        <i className={`${icon} text-2xl text-gray-400`}></i>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-[#10131d]">{title}</h3>
      {text && <p className="mt-2 text-sm text-gray-400">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export default EmptyState;
