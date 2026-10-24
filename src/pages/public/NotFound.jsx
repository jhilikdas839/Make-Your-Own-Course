import { Link, useNavigate } from "react-router-dom";

function NotFound({ inPanel = false }) {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-center px-4 ${inPanel ? "min-h-[60vh]" : "min-h-[70vh]"}`}>
      <div className="animate-scale-in text-center">
        <p className="text-8xl font-bold text-primary/20">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-[#10131d] md:text-3xl">This page doesn't exist</h1>
        <p className="mt-3 text-gray-500">The link may be broken, or the page may have been moved.</p>
        <div className="mt-7 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium hover:bg-gray-50"
          >
            Go back
          </button>
          {!inPanel && (
            <Link to="/" className="rounded-xl bg-[#10131d] px-5 py-3 text-sm font-medium text-white hover:bg-primary">
              Go to home
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotFound;
