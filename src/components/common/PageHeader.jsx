import Button from "./Button";

/**
 * Page title row used on every dashboard page.
 * Pass `action` for custom buttons, or buttonText + onButtonClick for one button.
 */
function PageHeader({ eyebrow, title, description, action, buttonText, buttonIcon, onButtonClick }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#10131d] md:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-gray-500">{description}</p>}
      </div>

      {action}
      {!action && buttonText && (
        <Button size="lg" icon={buttonIcon} onClick={onButtonClick} className="w-fit">
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default PageHeader;
