import { Link } from "react-router-dom";
import SafeImage from "../common/SafeImage";
import useLocalStorage from "../../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../../data/keys";
import { formatPrice } from "../../utils/format";
import { useToast } from "../common/toastContext";

function CourseCard({ course }) {
  const [wishlist, setWishlist] = useLocalStorage(STORAGE_KEYS.wishlist, []);
  const toast = useToast();
  const saved = wishlist.includes(course.id);

  const toggleWishlist = () => {
    setWishlist((prev) => (saved ? prev.filter((id) => id !== course.id) : [...prev, course.id]));
    toast(saved ? "Removed from wishlist" : "Saved to wishlist", saved ? "info" : "success");
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <Link to={`/courses/${course.id}`} aria-label={course.title}>
          <SafeImage
            src={course.image}
            alt={course.title}
            icon={course.icon}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-inter text-xs font-medium text-[#10131d] backdrop-blur-sm">
          {course.level}
        </span>
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          className={`absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition active:scale-90 ${
            saved ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
        >
          <i className={saved ? "ri-heart-fill" : "ri-heart-line"}></i>
        </button>
      </div>

      <div className="p-5">
        <p className="font-inter text-xs font-medium text-primary">{course.category}</p>
        <Link to={`/courses/${course.id}`}>
          <h3 className="mt-1 line-clamp-2 font-inter text-lg font-semibold leading-6 text-[#10131d] transition group-hover:text-primary">
            {course.title}
          </h3>
        </Link>
        <p className="mt-2 font-inter text-sm text-gray-500">By {course.instructor}</p>

        <div className="mt-4 flex flex-wrap items-center gap-4 font-inter text-xs text-gray-500">
          {course.rating > 0 && (
            <span className="flex items-center gap-1">
              <i className="ri-star-fill text-yellow-400"></i>
              {course.rating}
            </span>
          )}
          <span className="flex items-center gap-1">
            <i className="ri-play-circle-line"></i>
            {course.lessons} Lessons
          </span>
          <span className="flex items-center gap-1">
            <i className="ri-time-line"></i>
            {course.hours} Hours
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="font-inter text-xs text-gray-400">Course Price</p>
            <p className="font-inter text-xl font-bold text-primary">{formatPrice(course.price)}</p>
          </div>
          <Link
            to={`/courses/${course.id}`}
            className="flex items-center gap-2 rounded-xl bg-[#10131d] px-4 py-2.5 font-inter text-sm font-medium text-white transition hover:bg-primary"
          >
            View Course
            <i className="ri-arrow-right-line transition group-hover:translate-x-0.5"></i>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
