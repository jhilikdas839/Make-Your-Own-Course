import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import StatusBadge from "../../components/common/StatusBadge";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { initialSessions, mentors } from "../../data/studentData";
import { formatDate } from "../../utils/format";

const sessionTypes = ["1:1 Mentorship", "Career Session", "Project Review", "Doubt Session"];
const emptyForm = { title: "", mentor: mentors[0], type: sessionTypes[0], date: "", time: "" };

function Sessions() {
  const toast = useToast();
  const [sessions, setSessions] = useLocalStorage("myoc_sessions", initialSessions);
  const [bookOpen, setBookOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [details, setDetails] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  const upcoming = sessions.filter((s) => s.status === "Upcoming").sort((a, b) => a.date.localeCompare(b.date));
  const history = sessions.filter((s) => s.status !== "Upcoming");

  const book = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.date || !form.time) {
      toast("Fill in the topic, date and time.", "error");
      return;
    }
    setSessions((prev) => [...prev, { ...form, id: Date.now(), status: "Upcoming" }]);
    setForm(emptyForm);
    setBookOpen(false);
    toast(`Session booked with ${form.mentor}.`);
  };

  const cancel = () => {
    setSessions((prev) => prev.map((s) => (s.id === cancelId ? { ...s, status: "Cancelled" } : s)));
    setDetails(null);
    toast("Session cancelled.", "info");
  };

  return (
    <>
      <PageHeader eyebrow="Learning Support" title="Sessions" description="Book and manage your mentoring sessions." buttonText="Book a Session" buttonIcon="ri-add-line" onButtonClick={() => setBookOpen(true)} />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Upcoming" value={upcoming.length} icon="ri-calendar-event-line" />
        <StatCard label="Completed" value={sessions.filter((s) => s.status === "Completed").length} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Hours Learned" value="12h" icon="ri-time-line" tone="blue" />
        <StatCard label="Mentors" value={mentors.length} icon="ri-user-star-line" tone="purple" />
      </section>

      <h2 className="mb-5 text-2xl font-semibold">Upcoming Sessions</h2>
      <div className="mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {upcoming.length === 0 && <p className="text-gray-500">No upcoming sessions. Book one to get started.</p>}
        {upcoming.map((session) => (
          <div key={session.id} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{session.type}</span>
              <StatusBadge status={session.status} />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{session.title}</h3>
            <p className="mt-1 text-sm text-gray-400">with {session.mentor}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <i className="ri-calendar-line text-primary"></i>
              {formatDate(session.date)} · {session.time}
            </p>
            <Button className="mt-5 w-full" onClick={() => setDetails(session)}>View Session</Button>
          </div>
        ))}
      </div>

      <h2 className="mb-5 text-2xl font-semibold">Session History</h2>
      <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white">
        {history.map((session) => (
          <div key={session.id} className="flex flex-wrap items-center gap-4 p-4 md:p-5">
            <div className="min-w-0 flex-1">
              <p className="font-medium">{session.title}</p>
              <p className="text-xs text-gray-400">
                {session.mentor} · {formatDate(session.date)}
              </p>
            </div>
            <StatusBadge status={session.status} />
            <Button size="sm" variant="outline" onClick={() => setDetails(session)}>View Details</Button>
          </div>
        ))}
      </div>

      <Modal open={bookOpen} onClose={() => setBookOpen(false)} title="Book a session">
        <form onSubmit={book} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="s-title">Topic</label>
            <input id="s-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="What do you need help with?" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="s-mentor">Mentor</label>
              <select id="s-mentor" value={form.mentor} onChange={(e) => setForm({ ...form, mentor: e.target.value })} className={inputClass}>
                {mentors.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="s-type">Type</label>
              <select id="s-type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                {sessionTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="s-date">Date</label>
              <input id="s-date" type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="s-time">Time</label>
              <input id="s-time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">Book session</Button>
        </form>
      </Modal>

      <Modal
        open={Boolean(details)}
        onClose={() => setDetails(null)}
        title={details?.title}
        description={details && `${details.type} with ${details.mentor}`}
        size="sm"
        footer={
          details?.status === "Upcoming" && (
            <>
              <Button variant="outline" onClick={() => setCancelId(details.id)}>Cancel session</Button>
              <Button icon="ri-video-chat-line" onClick={() => window.open("https://meet.google.com/", "_blank", "noopener")}>Join</Button>
            </>
          )
        }
      >
        {details && (
          <div className="space-y-3 text-sm">
            <p className="flex justify-between"><span className="text-gray-400">Date</span>{formatDate(details.date)}</p>
            <p className="flex justify-between"><span className="text-gray-400">Time</span>{details.time}</p>
            <p className="flex justify-between"><span className="text-gray-400">Status</span><StatusBadge status={details.status} /></p>
          </div>
        )}
      </Modal>

      <ConfirmModal open={Boolean(cancelId)} onClose={() => setCancelId(null)} onConfirm={cancel} title="Cancel this session?" message="Your mentor will be notified. You can book another session at any time." confirmText="Cancel session" danger />
    </>
  );
}

export default Sessions;
