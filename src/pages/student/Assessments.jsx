import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import { useAssessments } from "../../hooks/useCourses";

function Assessments() {
  const [assessments] = useAssessments();
  const [result, setResult] = useState(null);

  const upcoming = assessments.filter((item) => item.status === "Upcoming");
  const completed = assessments.filter((item) => item.status === "Completed");
  const average = completed.length ? Math.round(completed.reduce((s, a) => s + a.score, 0) / completed.length) : 0;

  return (
    <>
      <PageHeader eyebrow="Test & Evaluation" title="Assessments" description="Take tests and review your results." />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Assessments" value={assessments.length} icon="ri-file-list-3-line" />
        <StatCard label="Completed" value={completed.length} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Upcoming" value={upcoming.length} icon="ri-calendar-line" tone="blue" />
        <StatCard label="Average Score" value={`${average}%`} icon="ri-bar-chart-line" tone="yellow" />
      </section>

      <h2 className="mb-5 text-2xl font-semibold">Upcoming Assessments</h2>
      {upcoming.length === 0 ? (
        <p className="mb-10 text-gray-500">All done! No upcoming assessments.</p>
      ) : (
        <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <i className={`${item.icon} text-2xl text-primary`}></i>
                </div>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.course}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Questions</p>
                  <p className="mt-1 font-medium">{item.questions.length}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="mt-1 font-medium">{item.duration} min</p>
                </div>
              </div>
              <Link to={`/student/assessments/${item.id}`} className="mt-5 block rounded-xl bg-[#10131d] py-3 text-center text-sm font-medium text-white transition hover:bg-primary">
                Start Assessment
              </Link>
            </div>
          ))}
        </div>
      )}

      <h2 className="mb-5 text-2xl font-semibold">Recent Results</h2>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-gray-50 text-xs text-gray-500">
            <tr>
              <th className="px-5 py-3 font-medium">Assessment</th>
              <th className="px-5 py-3 font-medium">Course</th>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {completed.map((item) => (
              <tr key={item.id}>
                <td className="px-5 py-4 font-medium">{item.title}</td>
                <td className="px-5 py-4 text-gray-500">{item.course}</td>
                <td className="px-5 py-4 text-gray-500">{item.date}</td>
                <td className="px-5 py-4">
                  <span className={`font-semibold ${item.score >= 80 ? "text-green-600" : item.score >= 60 ? "text-yellow-600" : "text-red-500"}`}>{item.score}%</span>
                </td>
                <td className="px-5 py-4">
                  <button type="button" onClick={() => setResult(item)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={Boolean(result)} onClose={() => setResult(null)} title={result?.title} description={result?.course} size="sm">
        {result && (
          <div className="text-center">
            <p className="text-6xl font-bold text-primary">{result.score}%</p>
            <p className="mt-2 text-gray-500">
              {Math.round((result.score / 100) * result.questions.length)} of {result.questions.length} correct
            </p>
            <p className="mt-4 rounded-xl bg-gray-50 p-3 text-sm">
              {result.score >= 80 ? "Excellent work! 🎉" : result.score >= 60 ? "Good job. Review the tricky topics." : "Keep practising and try again."}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Assessments;
