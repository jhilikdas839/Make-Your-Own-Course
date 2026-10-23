import React, { useMemo, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const initialAssessments = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    course: "React JS Masterclass",
    questions: 10,
    duration: 20,
    totalMarks: 100,
    attempts: 18,
    status: "Published",
    dueDate: "2026-10-30",
    description: "Test your knowledge of React components, props and hooks.",
    passingMarks: 40,
    results: [
      { name: "Aarav Sharma", score: 85 },
      { name: "Priya Das", score: 92 },
      { name: "Rahul Verma", score: 68 },
    ],
    quizQuestions: [
      {
        question: "What is React?",
        options: [
          "A JavaScript library",
          "A database",
          "An operating system",
          "A programming language",
        ],
        answer: 0,
      },
      {
        question: "Which hook is used to manage state?",
        options: ["useEffect", "useState", "useRouter", "useFetch"],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Basics Test",
    course: "JavaScript Fundamentals",
    questions: 15,
    duration: 30,
    totalMarks: 100,
    attempts: 14,
    status: "Published",
    dueDate: "2026-11-02",
    description: "Evaluate JavaScript fundamentals and programming concepts.",
    passingMarks: 40,
    results: [
      { name: "Sneha Roy", score: 88 },
      { name: "Aditya Singh", score: 56 },
    ],
    quizQuestions: [
      {
        question: "Which keyword declares a block-scoped variable?",
        options: ["var", "let", "define", "dim"],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Assessment",
    course: "UI/UX Design",
    questions: 20,
    duration: 45,
    totalMarks: 100,
    attempts: 0,
    status: "Draft",
    dueDate: "2026-11-05",
    description: "Assess design principles, typography and visual hierarchy.",
    passingMarks: 40,
    results: [],
    quizQuestions: [],
  },
];

const emptyForm = {
  title: "",
  course: "React JS Masterclass",
  duration: "20",
  totalMarks: "100",
  passingMarks: "40",
  dueDate: "",
  description: "",
};

const emptyQuestion = {
  question: "",
  options: ["", "", "", ""],
  answer: 0,
};

function TeacherAssessments() {
  const [assessments, setAssessments] = useState(initialAssessments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [questionForm, setQuestionForm] = useState(emptyQuestion);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const filteredAssessments = useMemo(() => {
    return assessments.filter((assessment) => {
      const query = search.toLowerCase();

      const matchesSearch =
        assessment.title.toLowerCase().includes(query) ||
        assessment.course.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || assessment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assessments, search, statusFilter]);

  const publishedCount = assessments.filter(
    (item) => item.status === "Published"
  ).length;

  const totalAttempts = assessments.reduce(
    (total, item) => total + item.attempts,
    0
  );

  const totalQuestions = assessments.reduce(
    (total, item) => total + item.questions,
    0
  );

  const stats = [
    {
      title: "Total Assessments",
      value: assessments.length,
      icon: "ri-file-list-3-line",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Published Tests",
      value: publishedCount,
      icon: "ri-checkbox-circle-line",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Student Attempts",
      value: totalAttempts,
      icon: "ri-user-follow-line",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Total Questions",
      value: totalQuestions,
      icon: "ri-questionnaire-line",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setShowForm(true);
  };

  const openEditForm = (assessment) => {
    setEditingId(assessment.id);
    setForm({
      title: assessment.title,
      course: assessment.course,
      duration: String(assessment.duration),
      totalMarks: String(assessment.totalMarks),
      passingMarks: String(assessment.passingMarks),
      dueDate: assessment.dueDate,
      description: assessment.description,
    });
    setMessage("");
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const totalMarks = Number(form.totalMarks);
    const passingMarks = Number(form.passingMarks);
    const duration = Number(form.duration);

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.dueDate ||
      duration <= 0 ||
      totalMarks <= 0 ||
      passingMarks < 0 ||
      passingMarks > totalMarks
    ) {
      setMessage("Please enter valid assessment details and marks.");
      return;
    }

    if (editingId !== null) {
      setAssessments((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...form,
                duration,
                totalMarks,
                passingMarks,
              }
            : item
        )
      );
    } else {
      setAssessments((previous) => [
        {
          id: Date.now(),
          ...form,
          duration,
          totalMarks,
          passingMarks,
          questions: 0,
          attempts: 0,
          status: "Draft",
          results: [],
          quizQuestions: [],
        },
        ...previous,
      ]);
    }

    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    setMessage("");
  };

  const togglePublish = (id) => {
    setAssessments((previous) =>
      previous.map((item) => {
        if (item.id !== id) return item;

        if (item.status === "Draft" && item.quizQuestions.length === 0) {
          window.alert("Add at least one question before publishing.");
          return item;
        }

        return {
          ...item,
          status: item.status === "Published" ? "Draft" : "Published",
        };
      })
    );
  };

  const deleteAssessment = (id) => {
    if (!window.confirm("Delete this assessment?")) return;

    setAssessments((previous) =>
      previous.filter((item) => item.id !== id)
    );

    setSelectedAssessment(null);
    setShowQuestionForm(false);
  };

  const addQuestion = (e) => {
    e.preventDefault();

    if (
      !questionForm.question.trim() ||
      questionForm.options.some((option) => !option.trim())
    ) {
      setMessage("Enter the question and all four options.");
      return;
    }

    setAssessments((previous) =>
      previous.map((item) => {
        if (item.id !== selectedAssessment.id) return item;

        return {
          ...item,
          quizQuestions: [...item.quizQuestions, { ...questionForm }],
          questions: item.quizQuestions.length + 1,
        };
      })
    );

    setSelectedAssessment((previous) => ({
      ...previous,
      quizQuestions: [
        ...previous.quizQuestions,
        { ...questionForm },
      ],
      questions: previous.quizQuestions.length + 1,
    }));

    setQuestionForm(emptyQuestion);
    setMessage("");
    setShowQuestionForm(false);
  };

  const removeQuestion = (questionIndex) => {
    if (!window.confirm("Remove this question?")) return;

    setAssessments((previous) =>
      previous.map((item) => {
        if (item.id !== selectedAssessment.id) return item;

        const updatedQuestions = item.quizQuestions.filter(
          (_, index) => index !== questionIndex
        );

        return {
          ...item,
          quizQuestions: updatedQuestions,
          questions: updatedQuestions.length,
        };
      })
    );

    setSelectedAssessment((previous) => {
      const updatedQuestions = previous.quizQuestions.filter(
        (_, index) => index !== questionIndex
      );

      return {
        ...previous,
        quizQuestions: updatedQuestions,
        questions: updatedQuestions.length,
      };
    });
  };

  const formatDate = (date) => {
    if (!date) return "Not set";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-7">
      {/* Header */}
      <TeacherPageHeader
        title="Assessments"
        description="Create quizzes, add MCQ questions and review student results."
        buttonText="Create Assessment"
        buttonIcon="ri-add-line"
        onButtonClick={openCreateForm}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}
              >
                <i className={`${stat.icon} text-xl`} />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-gray-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Assessments List */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              All Assessments
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage your quizzes and tests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assessments..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 sm:p-6 xl:grid-cols-2">
          {filteredAssessments.map((assessment) => (
            <article
              key={assessment.id}
              className="rounded-2xl border border-gray-100 p-5 transition hover:border-blue-100 hover:shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <i className="ri-questionnaire-line text-xl" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900">
                      {assessment.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {assessment.course}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    assessment.status === "Published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {assessment.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {assessment.description}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Questions</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {assessment.questions}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {assessment.duration} min
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Total Marks</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {assessment.totalMarks}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">Attempts</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {assessment.attempts}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <i className="ri-calendar-line" />
                Due: {formatDate(assessment.dueDate)}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  onClick={() => {
                    setSelectedAssessment(assessment);
                    setShowQuestionForm(false);
                    setMessage("");
                  }}
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="ri-eye-line mr-1" />
                  View
                </button>

                <button
                  onClick={() => openEditForm(assessment)}
                  className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="ri-edit-line mr-1" />
                  Edit
                </button>

                <button
                  onClick={() => togglePublish(assessment.id)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium ${
                    assessment.status === "Published"
                      ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {assessment.status === "Published" ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => deleteAssessment(assessment.id)}
                  className="rounded-xl border border-red-100 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <i className="ri-delete-bin-line mr-1" />
                  Delete
                </button>
              </div>
            </article>
          ))}

          {filteredAssessments.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <i className="ri-file-search-line text-4xl text-gray-300" />
              <p className="mt-3 font-medium text-gray-700">
                No assessments found
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try another search or create an assessment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Create / Edit Assessment Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white p-5 shadow-xl sm:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingId !== null ? "Edit Assessment" : "Create Assessment"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Configure your assessment details.
                </p>
              </div>

              <button
                onClick={() => setShowForm(false)}
                aria-label="Close form"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Assessment Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter assessment title"
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Course
                </label>
                <select
                  value={form.course}
                  onChange={(e) =>
                    setForm({ ...form, course: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option>React JS Masterclass</option>
                  <option>JavaScript Fundamentals</option>
                  <option>UI/UX Design</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.duration}
                    onChange={(e) =>
                      setForm({ ...form, duration: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Total Marks
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.totalMarks}
                    onChange={(e) =>
                      setForm({ ...form, totalMarks: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Passing Marks
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.passingMarks}
                    onChange={(e) =>
                      setForm({ ...form, passingMarks: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      setForm({ ...form, dueDate: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the assessment..."
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {message && (
                <p className="text-sm text-red-600">{message}</p>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {editingId !== null ? "Save Changes" : "Create Draft"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assessment Details and Question Manager */}
      {selectedAssessment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
          onClick={() => {
            setSelectedAssessment(null);
            setShowQuestionForm(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="assessment-details-title"
            className="my-auto max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                  Assessment Manager
                </p>
                <h2
                  id="assessment-details-title"
                  className="mt-2 text-xl font-semibold text-gray-900"
                >
                  {selectedAssessment.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedAssessment.course}
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedAssessment(null);
                  setShowQuestionForm(false);
                }}
                aria-label="Close assessment details"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
              >
                <i className="ri-close-line text-xl" />
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Questions</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedAssessment.quizQuestions.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedAssessment.duration} min
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Total Marks</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedAssessment.totalMarks}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-xs text-gray-500">Passing Marks</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {selectedAssessment.passingMarks}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold text-gray-900">
                MCQ Questions
              </h3>

              <button
                onClick={() => {
                  setQuestionForm(emptyQuestion);
                  setMessage("");
                  setShowQuestionForm(!showQuestionForm);
                }}
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                <i className="ri-add-line mr-1" />
                Add Question
              </button>
            </div>

            {showQuestionForm && (
              <form
                onSubmit={addQuestion}
                className="mt-5 space-y-4 rounded-xl border border-blue-100 bg-blue-50/40 p-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Question
                  </label>
                  <textarea
                    rows="2"
                    value={questionForm.question}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        question: e.target.value,
                      })
                    }
                    placeholder="Enter your question"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {questionForm.options.map((option, index) => (
                  <div key={index}>
                    <label className="mb-1.5 block text-sm text-gray-600">
                      Option {index + 1}
                    </label>
                    <input
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...questionForm.options];
                        updatedOptions[index] = e.target.value;

                        setQuestionForm({
                          ...questionForm,
                          options: updatedOptions,
                        });
                      }}
                      placeholder={`Enter option ${index + 1}`}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Correct Answer
                  </label>
                  <select
                    value={questionForm.answer}
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        answer: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  >
                    {questionForm.options.map((_, index) => (
                      <option key={index} value={index}>
                        Option {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {message && (
                  <p className="text-sm text-red-600">{message}</p>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Save Question
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowQuestionForm(false);
                      setMessage("");
                    }}
                    className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 space-y-4">
              {selectedAssessment.quizQuestions.map((question, index) => (
                <div
                  key={`${selectedAssessment.id}-${index}`}
                  className="rounded-xl border border-gray-100 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-medium text-gray-900">
                      Q{index + 1}. {question.question}
                    </p>

                    <button
                      onClick={() => removeQuestion(index)}
                      aria-label={`Delete question ${index + 1}`}
                      className="shrink-0 text-red-500 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-line text-lg" />
                    </button>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`rounded-lg border px-3 py-2 text-sm ${
                          optionIndex === question.answer
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-gray-100 text-gray-600"
                        }`}
                      >
                        <span className="mr-2 font-medium">
                          {String.fromCharCode(65 + optionIndex)}.
                        </span>
                        {option}
                        {optionIndex === question.answer && (
                          <i className="ri-check-line ml-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {selectedAssessment.quizQuestions.length === 0 && (
                <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
                  <i className="ri-questionnaire-line text-3xl text-gray-300" />
                  <p className="mt-2 text-sm font-medium text-gray-700">
                    No questions added yet
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Add MCQ questions before publishing this assessment.
                  </p>
                </div>
              )}
            </div>

            {/* Demo Results */}
            {selectedAssessment.results.length > 0 && (
              <div className="mt-7">
                <h3 className="font-semibold text-gray-900">
                  Sample Student Results
                </h3>

                <div className="mt-3 divide-y divide-gray-100 rounded-xl border border-gray-100">
                  {selectedAssessment.results.map((result) => (
                    <div
                      key={result.name}
                      className="flex items-center justify-between gap-3 p-4"
                    >
                      <span className="text-sm text-gray-700">
                        {result.name}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          result.score >= selectedAssessment.passingMarks
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {result.score}/{selectedAssessment.totalMarks}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedAssessment(null);
                setShowQuestionForm(false);
              }}
              className="mt-6 w-full rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherAssessments;