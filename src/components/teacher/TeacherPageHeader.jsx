
function TeacherPageHeader({
  title,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Right Section */}
      {buttonText && (
        <button
          type="button"
          onClick={onButtonClick}
          className="flex w-fit items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {buttonIcon && <i className={`${buttonIcon} text-lg`}></i>}
          {buttonText}
        </button>
      )}

    </div>
  );
}

export default TeacherPageHeader;
