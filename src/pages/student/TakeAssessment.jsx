import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import ProgressBar from "../../components/student/ProgressBar";
import { useToast } from "../../components/common/toastContext";
import { useAssessments } from "../../hooks/useCourses";

function TakeAssessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [assessments, setAssessments] = useAssessments();
  const assessment = assessments.find((item) => String(item.id) === id);

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [secondsLeft, setSecondsLeft] = useState((assessment?.duration || 10) * 60);
  const [score, setScore] = useState(null);

  const finished = score !== null;

  useEffect(() => {
    if (finished || !assessment) return;
    const timer = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [finished, assessment]);

  if (!assessment) {
    return <EmptyState title="Assessment not found" action={<Link to="/student/assessments" className="text-primary">Back to assessments</Link>} />;
  }

  const questions = assessment.questions;

  const submit = () => {
    const correct = questions.filter((q, i) => answers[i] === q.answer).length;
    const percent = Math.round((correct / questions.length) * 100);
    setScore(percent);
    setAssessments((prev) =>
      prev.map((item) =>
        item.id === assessment.id ? { ...item, status: "Completed", score: percent, date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) } : item
      )
    );
    toast("Assessment submitted.");
  };

  if (finished) {
    return (
      <div className="mx-auto max-w-lg animate-scale-in rounded-3xl border border-gray-200 bg-white p-8 text-center">
        <p className="text-sm text-primary">{assessment.title}</p>
        <p className="mt-4 text-7xl font-bold">{score}%</p>
        <p className="mt-2 text-gray-500">
          {questions.filter((q, i) => answers[i] === q.answer).length} of {questions.length} correct
        </p>
        <div className="mt-6 space-y-2 text-left">
          {questions.map((q, i) => (
            <div key={q.question} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 text-sm">
              <i className={answers[i] === q.answer ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-fill text-red-500"}></i>
              <span>
                {q.question}
                <span className="block text-xs text-gray-400">Answer: {q.options[q.answer]}</span>
              </span>
            </div>
          ))}
        </div>
        <Button className="mt-6 w-full" onClick={() => navigate("/student/assessments")}>Back to assessments</Button>
      </div>
    );
  }

  const timeUp = secondsLeft === 0;
  const question = questions[step];
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-primary">{assessment.course}</p>
          <h1 className="text-2xl font-semibold">{assessment.title}</h1>
        </div>
        <span className={`rounded-xl px-4 py-2 font-mono text-sm font-semibold ${secondsLeft < 60 ? "bg-red-50 text-red-500" : "bg-white"}`}>
          <i className="ri-timer-line mr-1"></i>
          {minutes}:{seconds}
        </span>
      </div>

      <ProgressBar value={((step + 1) / questions.length) * 100} />

      {timeUp && (
        <div className="mt-4 flex animate-fade-in items-center justify-between gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-600">
          Time is up. Submit to see your score.
          <Button variant="danger" size="sm" onClick={submit}>Submit now</Button>
        </div>
      )}

      <div key={step} className="mt-6 animate-slide-in rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
        <p className="text-xs text-gray-400">
          Question {step + 1} of {questions.length}
        </p>
        <h2 className="mt-2 text-xl font-semibold">{question.question}</h2>
        <div className="mt-6 space-y-3">
          {question.options.map((option, index) => {
            const selected = answers[step] === index;
            return (
              <button
                key={option}
                type="button"
                disabled={timeUp}
                onClick={() => setAnswers((prev) => ({ ...prev, [step]: index }))}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition ${
                  selected ? "border-primary bg-primary/10 font-medium" : "border-gray-200 hover:border-primary/50"
                }`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${selected ? "border-primary bg-primary text-white" : "border-gray-300"}`}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Previous</Button>
        {step < questions.length - 1 ? (
          <Button onClick={() => setStep(step + 1)} disabled={answers[step] === undefined}>Next</Button>
        ) : (
          <Button variant="primary" onClick={submit} disabled={Object.keys(answers).length < questions.length}>Submit</Button>
        )}
      </div>
    </div>
  );
}

export default TakeAssessment;
