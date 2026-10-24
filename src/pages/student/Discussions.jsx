import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useCurrentUser } from "../../hooks/useAuth";
import { useMyCourses } from "../../hooks/useCourses";
import useLocalStorage from "../../hooks/useLocalStorage";
import { initialDiscussions } from "../../data/studentData";
import { getInitials } from "../../utils/auth";

const tabs = ["All", "My Discussions", "Solved", "Unsolved"];
const emptyForm = { title: "", course: "", details: "" };

function Discussions() {
  const toast = useToast();
  const user = useCurrentUser();
  const { myCourses } = useMyCourses();
  const [discussions, setDiscussions] = useLocalStorage("myoc_discussions", initialDiscussions);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [askOpen, setAskOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState("");

  const opened = discussions.find((item) => item.id === openId);
  const term = search.toLowerCase();
  const filtered = discussions.filter((item) => {
    const tabMatch =
      activeTab === "All" ||
      (activeTab === "My Discussions" && item.author === user.name) ||
      (activeTab === "Solved" && item.solved) ||
      (activeTab === "Unsolved" && !item.solved);
    return tabMatch && `${item.title} ${item.course} ${item.author}`.toLowerCase().includes(term);
  });

  const ask = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.course) {
      toast("Add a title and choose a course.", "error");
      return;
    }
    const newItem = {
      id: Date.now(),
      title: form.title.trim(),
      details: form.details.trim(),
      course: form.course,
      author: user.name,
      views: 0,
      time: "Just now",
      category: "Question",
      solved: false,
      replies: [],
    };
    setDiscussions((prev) => [newItem, ...prev]);
    setForm(emptyForm);
    setAskOpen(false);
    toast("Your question is posted.");
  };

  const update = (id, changes) => setDiscussions((prev) => prev.map((item) => (item.id === id ? { ...item, ...changes } : item)));

  const sendReply = (event) => {
    event.preventDefault();
    if (!reply.trim()) return;
    update(opened.id, { replies: [...opened.replies, { author: user.name, text: reply.trim(), time: "Just now" }] });
    setReply("");
  };

  const openThread = (item) => {
    update(item.id, { views: item.views + 1 });
    setOpenId(item.id);
  };

  return (
    <>
      <PageHeader eyebrow="Community" title="Discussions" description="Ask questions and help other learners." buttonText="Start Discussion" buttonIcon="ri-add-line" onButtonClick={() => setAskOpen(true)} />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Discussions" value={discussions.length} icon="ri-chat-3-line" />
        <StatCard label="My Discussions" value={discussions.filter((d) => d.author === user.name).length} icon="ri-user-voice-line" tone="blue" />
        <StatCard label="Solved" value={discussions.filter((d) => d.solved).length} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Replies" value={discussions.reduce((s, d) => s + d.replies.length, 0)} icon="ri-reply-line" tone="purple" />
      </section>

      <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search discussions..." className="w-full md:w-72" />
      </section>

      {filtered.length === 0 ? (
        <EmptyState icon="ri-chat-3-line" title="No discussions found" text="Try another search or start a new discussion." action={<Button onClick={() => setAskOpen(true)}>Ask a Question</Button>} />
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => openThread(item)}
              className="flex w-full items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left transition hover:border-primary/40 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#10131d] text-xs font-bold text-white">{getInitials(item.author)}</span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{item.title}</span>
                  {item.solved && <span className="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-600">Solved</span>}
                </span>
                <span className="mt-1 block text-xs text-gray-400">
                  {item.author} · {item.course} · {item.time}
                </span>
              </span>
              <span className="hidden shrink-0 gap-4 text-xs text-gray-400 sm:flex">
                <span><i className="ri-chat-3-line"></i> {item.replies.length}</span>
                <span><i className="ri-eye-line"></i> {item.views}</span>
              </span>
            </button>
          ))}
        </div>
      )}

      <Modal open={askOpen} onClose={() => setAskOpen(false)} title="Ask a question" description="Be specific so others can help quickly.">
        <form id="ask-form" onSubmit={ask} className="space-y-4">
          <div>
            <label className={labelClass} htmlFor="d-title">Title</label>
            <input id="d-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} placeholder="e.g. Why does my useEffect run twice?" />
          </div>
          <div>
            <label className={labelClass} htmlFor="d-course">Course</label>
            <select id="d-course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className={inputClass}>
              <option value="">Choose a course</option>
              {myCourses.map((course) => (
                <option key={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="d-details">Details</label>
            <textarea id="d-details" rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className={`${inputClass} resize-none`} placeholder="What have you tried so far?" />
          </div>
          <Button type="submit" className="w-full" size="lg">Post question</Button>
        </form>
      </Modal>

      <Modal open={Boolean(opened)} onClose={() => setOpenId(null)} title={opened?.title} description={opened && `${opened.author} · ${opened.course}`} size="lg">
        {opened && (
          <div>
            {opened.details && <p className="mb-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">{opened.details}</p>}
            <div className="space-y-3">
              {opened.replies.length === 0 && <p className="text-sm text-gray-400">No replies yet. Be the first to help!</p>}
              {opened.replies.map((r, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{getInitials(r.author)}</span>
                  <div className="flex-1 rounded-2xl bg-gray-50 px-4 py-3">
                    <p className="text-xs font-semibold">
                      {r.author} <span className="font-normal text-gray-400">· {r.time}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-600">{r.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={sendReply} className="mt-5 flex gap-2">
              <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply..." className={inputClass} />
              <Button type="submit" icon="ri-send-plane-line" disabled={!reply.trim()}>Reply</Button>
            </form>
            {opened.author === user.name && (
              <button type="button" onClick={() => update(opened.id, { solved: !opened.solved })} className="mt-4 text-sm font-medium text-primary hover:underline">
                {opened.solved ? "Mark as unsolved" : "Mark as solved"}
              </button>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default Discussions;
