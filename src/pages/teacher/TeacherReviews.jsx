
import { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialReviews = [
  {
    id: 1,
    student: "Aarav Sharma",
    initials: "AS",
    course: "React JS Masterclass",
    rating: 5,
    date: "Oct 23, 2026",
    comment:
      "Amazing course! The React concepts are explained clearly. The practical examples helped me understand hooks and component lifecycle much better.",
    helpful: 12,
    reply: "",
    verified: true,
  },
  {
    id: 2,
    student: "Priya Verma",
    initials: "PV",
    course: "JavaScript Fundamentals",
    rating: 4,
    date: "Oct 22, 2026",
    comment:
      "The course is very useful and beginner-friendly. I would love to see more advanced coding challenges in future lessons.",
    helpful: 8,
    reply: "Thank you for your feedback! I will consider adding more advanced challenges.",
    verified: true,
  },
  {
    id: 3,
    student: "Rahul Das",
    initials: "RD",
    course: "React JS Masterclass",
    rating: 3,
    date: "Oct 20, 2026",
    comment:
      "The content is good, but some topics move a little too quickly. More examples in the advanced sections would be helpful.",
    helpful: 4,
    reply: "",
    verified: true,
  },
  {
    id: 4,
    student: "Ananya Singh",
    initials: "AS",
    course: "UI/UX Design",
    rating: 5,
    date: "Oct 19, 2026",
    comment:
      "Loved the design projects! The explanations about spacing, typography and visual hierarchy were excellent.",
    helpful: 15,
    reply: "",
    verified: true,
  },
  {
    id: 5,
    student: "Rohan Gupta",
    initials: "RG",
    course: "JavaScript Fundamentals",
    rating: 2,
    date: "Oct 18, 2026",
    comment:
      "The course has some good lessons, but I found a few explanations difficult to follow. More step-by-step examples would help.",
    helpful: 3,
    reply: "",
    verified: true,
  },
  {
    id: 6,
    student: "Sneha Roy",
    initials: "SR",
    course: "UI/UX Design",
    rating: 5,
    date: "Oct 16, 2026",
    comment:
      "One of the best design courses I have taken. The practical assignments made learning enjoyable.",
    helpful: 9,
    reply: "Thank you so much! Happy to hear that you enjoyed the assignments.",
    verified: true,
  },
  {
    id: 7,
    student: "Aditya Kumar",
    initials: "AK",
    course: "React JS Masterclass",
    rating: 4,
    date: "Oct 14, 2026",
    comment:
      "Very informative course with useful real-world examples. Looking forward to more projects.",
    helpful: 6,
    reply: "",
    verified: true,
  },
  {
    id: 8,
    student: "Meera Das",
    initials: "MD",
    course: "JavaScript Fundamentals",
    rating: 1,
    date: "Oct 12, 2026",
    comment:
      "I struggled to follow some lessons. It would be helpful to include more beginner-level explanations.",
    helpful: 2,
    reply: "",
    verified: true,
  },
];

const ratingLabels = {
  5: "Excellent",
  4: "Good",
  3: "Average",
  2: "Poor",
  1: "Very Poor",
};

function TeacherReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedRating, setSelectedRating] = useState("All Ratings");
  const [replyFilter, setReplyFilter] = useState("All Reviews");
  const [sortBy, setSortBy] = useState("newest");
  const [activeReview, setActiveReview] = useState(null);
  const [replyText, setReplyText] = useState("");

  const courses = [
    "All Courses",
    ...new Set(reviews.map((review) => review.course)),
  ];

  const stats = useMemo(() => {
    const totalReviews = reviews.length;

    const averageRating = totalReviews
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        totalReviews
      : 0;

    const fiveStarReviews = reviews.filter(
      (review) => review.rating === 5
    ).length;

    const pendingReplies = reviews.filter(
      (review) => !review.reply.trim()
    ).length;

    return {
      totalReviews,
      averageRating,
      fiveStarReviews,
      pendingReplies,
    };
  }, [reviews]);

  const ratingBreakdown = useMemo(() => {
    return [5, 4, 3, 2, 1].map((rating) => {
      const count = reviews.filter(
        (review) => review.rating === rating
      ).length;

      return {
        rating,
        count,
        percentage: reviews.length
          ? (count / reviews.length) * 100
          : 0,
      };
    });
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const result = reviews.filter((review) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        review.student.toLowerCase().includes(searchValue) ||
        review.course.toLowerCase().includes(searchValue) ||
        review.comment.toLowerCase().includes(searchValue);

      const matchesCourse =
        selectedCourse === "All Courses" ||
        review.course === selectedCourse;

      const matchesRating =
        selectedRating === "All Ratings" ||
        review.rating === Number(selectedRating);

      const matchesReply =
        replyFilter === "All Reviews" ||
        (replyFilter === "Replied" && Boolean(review.reply.trim())) ||
        (replyFilter === "Needs Reply" && !review.reply.trim());

      return (
        matchesSearch &&
        matchesCourse &&
        matchesRating &&
        matchesReply
      );
    });

    return [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return b.id - a.id;
      }

      if (sortBy === "highest") {
        return b.rating - a.rating;
      }

      if (sortBy === "lowest") {
        return a.rating - b.rating;
      }

      if (sortBy === "helpful") {
        return b.helpful - a.helpful;
      }

      return 0;
    });
  }, [
    reviews,
    search,
    selectedCourse,
    selectedRating,
    replyFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch("");
    setSelectedCourse("All Courses");
    setSelectedRating("All Ratings");
    setReplyFilter("All Reviews");
    setSortBy("newest");
  };

  const toggleHelpful = (reviewId) => {
    setReviews((previousReviews) =>
      previousReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              helpful: review.helpful + 1,
            }
          : review
      )
    );
  };

  const openReplyModal = (review) => {
    setActiveReview(review);
    setReplyText(review.reply);
  };

  const saveReply = () => {
    if (!activeReview || !replyText.trim()) {
      return;
    }

    setReviews((previousReviews) =>
      previousReviews.map((review) =>
        review.id === activeReview.id
          ? {
              ...review,
              reply: replyText.trim(),
            }
          : review
      )
    );

    setActiveReview(null);
    setReplyText("");
  };

  const deleteReply = (reviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this reply?"
    );

    if (!confirmed) return;

    setReviews((previousReviews) =>
      previousReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              reply: "",
            }
          : review
      )
    );
  };

  const statCards = [
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      suffix: "/ 5.0",
      description: "Across all reviews",
      icon: "ri-star-smile-line",
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Total Reviews",
      value: stats.totalReviews,
      suffix: "",
      description: "Student feedback received",
      icon: "ri-chat-quote-line",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "5-Star Reviews",
      value: stats.fiveStarReviews,
      suffix: "",
      description: "Excellent student ratings",
      icon: "ri-award-line",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Needs a Reply",
      value: stats.pendingReplies,
      suffix: "",
      description: "Reviews awaiting your response",
      icon: "ri-reply-line",
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-7 pb-8">
      {/* Page Header */}
      <TeacherPageHeader
        title="Reviews & Ratings"
        description="Understand student feedback, monitor your course ratings and respond to reviews."
      />

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <div className="mt-3 flex items-baseline gap-1">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    {card.value}
                  </h2>

                  {card.suffix && (
                    <span className="text-sm text-gray-400">
                      {card.suffix}
                    </span>
                  )}
                </div>

                {card.title === "Average Rating" && (
                  <div className="mt-2 flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }, (_, index) => (
                      <i
                        key={index}
                        className={
                          index < Math.round(stats.averageRating)
                            ? "ri-star-fill"
                            : "ri-star-line"
                        }
                      ></i>
                    ))}
                  </div>
                )}

                <p className="mt-2 text-xs text-gray-500">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${card.iconStyle}`}
              >
                <i className={card.icon}></i>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Rating Overview */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Overall Rating
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your students' overall experience.
          </p>

          <div className="mt-7 flex items-center gap-5">
            <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-2xl bg-amber-50">
              <span className="text-4xl font-bold text-gray-900">
                {stats.averageRating.toFixed(1)}
              </span>

              <div className="mt-1 flex gap-0.5 text-xs text-amber-500">
                {Array.from({ length: 5 }, (_, index) => (
                  <i
                    key={index}
                    className={
                      index < Math.round(stats.averageRating)
                        ? "ri-star-fill"
                        : "ri-star-line"
                    }
                  ></i>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-gray-900">
                {stats.averageRating >= 4
                  ? "Great feedback!"
                  : "Keep improving!"}
              </p>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {stats.averageRating >= 4
                  ? "Students are responding positively to your courses."
                  : "Review student feedback to find areas for improvement."}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Based on {stats.totalReviews} sample reviews
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:col-span-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Rating Breakdown
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Distribution of student ratings.
          </p>

          <div className="mt-5 space-y-3">
            {ratingBreakdown.map((item) => (
              <div
                key={item.rating}
                className="flex items-center gap-3"
              >
                <span className="flex w-12 shrink-0 items-center gap-1 text-sm font-medium text-gray-700">
                  {item.rating}
                  <i className="ri-star-fill text-amber-400"></i>
                </span>

                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  ></div>
                </div>

                <span className="w-8 text-right text-xs text-gray-500">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Student Reviews
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Read feedback and manage your responses.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 gap-3 border-b border-gray-100 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:p-6">
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search reviews..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={selectedCourse}
            onChange={(event) => setSelectedCourse(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={selectedRating}
            onChange={(event) => setSelectedRating(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All Ratings">All Ratings</option>

            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Stars — {ratingLabels[rating]}
              </option>
            ))}
          </select>

          <select
            value={replyFilter}
            onChange={(event) => setReplyFilter(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All Reviews">All Reviews</option>
            <option value="Needs Reply">Needs Reply</option>
            <option value="Replied">Replied</option>
          </select>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="text-left text-sm font-medium text-blue-600 hover:text-blue-700 sm:col-span-2 lg:col-span-3 xl:col-span-5"
          >
            <i className="ri-refresh-line mr-1"></i>
            Reset filters
          </button>
        </div>

        {/* Review Cards */}
        <div className="divide-y divide-gray-100">
          {filteredReviews.map((review) => (
            <article
              key={review.id}
              className="p-5 transition hover:bg-gray-50/50 sm:p-6"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                  {review.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {review.student}
                        </h3>

                        {review.verified && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-medium text-emerald-700">
                            <i className="ri-checkbox-circle-fill"></i>
                            Verified
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {review.course}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs text-gray-400">
                      {review.date}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <div className="flex gap-0.5 text-sm text-amber-400">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={
                            index < review.rating
                              ? "ri-star-fill"
                              : "ri-star-line text-gray-300"
                          }
                        ></i>
                      ))}
                    </div>

                    <span className="text-xs font-medium text-gray-600">
                      {ratingLabels[review.rating]}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-7 text-gray-600">
                    {review.comment}
                  </p>

                  {/* Existing Reply */}
                  {review.reply && (
                    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                      <div className="flex items-start gap-2">
                        <i className="ri-reply-line mt-0.5 text-lg text-blue-600"></i>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-blue-700">
                            Your Response
                          </p>

                          <p className="mt-2 text-sm leading-6 text-gray-700">
                            {review.reply}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => toggleHelpful(review.id)}
                      className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-gray-500 transition hover:bg-gray-100 hover:text-blue-600"
                    >
                      <i className="ri-thumb-up-line text-base"></i>
                      Helpful ({review.helpful})
                    </button>

                    <div className="flex flex-wrap items-center gap-2">
                      {review.reply && (
                        <button
                          type="button"
                          onClick={() => deleteReply(review.id)}
                          className="rounded-lg px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50"
                        >
                          Remove Reply
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => openReplyModal(review)}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                      >
                        <i className="ri-reply-line text-base"></i>
                        {review.reply ? "Edit Reply" : "Reply to Review"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {filteredReviews.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl text-gray-400">
                <i className="ri-chat-search-line"></i>
              </div>

              <h3 className="mt-4 font-semibold text-gray-900">
                No reviews found
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or filters.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 text-sm font-medium text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500 sm:px-6">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </div>
      </section>

      {/* Reply Modal */}
      {activeReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4"
          onClick={() => setActiveReview(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="reply-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="reply-modal-title"
                  className="text-xl font-bold text-gray-900"
                >
                  Reply to Review
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Respond professionally to student feedback.
                </p>
              </div>

              <button
                type="button"
                aria-label="Close reply modal"
                onClick={() => setActiveReview(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mt-5 rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-gray-900">
                  {activeReview.student}
                </p>

                <div className="flex shrink-0 gap-0.5 text-sm text-amber-400">
                  {Array.from({ length: activeReview.rating }, (_, index) => (
                    <i key={index} className="ri-star-fill"></i>
                  ))}
                </div>
              </div>

              <p className="mt-1 text-xs text-gray-500">
                {activeReview.course}
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {activeReview.comment}
              </p>
            </div>

            <label
              htmlFor="teacher-review-reply"
              className="mt-5 block text-sm font-semibold text-gray-800"
            >
              Your Response
            </label>

            <textarea
              id="teacher-review-reply"
              rows={5}
              value={replyText}
              onChange={(event) => setReplyText(event.target.value)}
              placeholder="Thank the student and respond to their feedback..."
              maxLength={1000}
              className="mt-2 w-full resize-y rounded-xl border border-gray-200 p-4 text-sm leading-6 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            ></textarea>

            <div className="mt-2 flex justify-between gap-3 text-xs text-gray-400">
              <span>Keep your response polite and constructive.</span>
              <span>{replyText.length}/1000</span>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setActiveReview(null)}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={saveReply}
                disabled={!replyText.trim()}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <i className="ri-send-plane-line mr-2"></i>
                Save Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherReviews;
