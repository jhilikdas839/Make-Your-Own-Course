function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex w-fit max-w-full overflow-x-auto rounded-xl border border-gray-200 bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition md:px-5 ${
            active === tab ? "bg-[#10131d] text-white" : "text-gray-500 hover:text-[#10131d]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
