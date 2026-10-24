import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import IconButton from "../../components/admin/IconButton";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useAnnouncements } from "../../hooks/usePlatformData";

const audiences = ["Everyone", "Students", "Teachers"];
const emptyForm = { title: "", message: "", audience: "Everyone" };

function AdminAnnouncements() {
  const toast = useToast();
  const [announcements, setAnnouncements] = useAnnouncements();
  const [form, setForm] = useState(emptyForm);

  const publish = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      toast("Add a title and a message.", "error");
      return;
    }
    setAnnouncements((prev) => [{ ...form, id: Date.now(), date: new Date().toISOString().slice(0, 10) }, ...prev]);
    setForm(emptyForm);
    toast(`Announcement sent to ${form.audience.toLowerCase()}.`);
  };

  return (
    <>
      <PageHeader eyebrow="Communicate" title="Announcements" description="Send platform-wide updates to students, teachers or everyone." />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <form onSubmit={publish} className="h-fit space-y-4 rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">New announcement</h2>
          <div>
            <label className={labelClass} htmlFor="a-title">Title</label>
            <input id="a-title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="a-msg">Message</label>
            <textarea id="a-msg" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} />
          </div>
          <div>
            <p className={labelClass}>Send to</p>
            <div className="flex gap-2">
              {audiences.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setForm({ ...form, audience: a })}
                  className={`flex-1 rounded-xl border px-3 py-2.5 text-sm transition ${form.audience === a ? "border-primary bg-primary/10 font-medium text-primary" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full" icon="ri-send-plane-line">Publish</Button>
        </form>

        <div className="space-y-3">
          {announcements.length === 0 && <EmptyState icon="ri-megaphone-line" title="No announcements yet" />}
          {announcements.map((a) => (
            <div key={a.id} className="flex animate-fade-in gap-4 rounded-2xl border border-gray-200 bg-white p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <i className="ri-megaphone-line text-lg text-primary"></i>
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{a.title}</p>
                <p className="mt-1 text-sm text-gray-600">{a.message}</p>
                <p className="mt-2 text-xs text-gray-400">To {a.audience} · {a.date}</p>
              </div>
              <IconButton
                icon="ri-delete-bin-line"
                label="Delete"
                tone="red"
                onClick={() => {
                  setAnnouncements((prev) => prev.filter((x) => x.id !== a.id));
                  toast("Announcement deleted.", "info");
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminAnnouncements;
