import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import { useToast } from "../../components/common/toastContext";
import { useContactMessages } from "../../hooks/usePlatformData";

// Messages sent from the public Contact page.
function AdminMessages() {
  const toast = useToast();
  const [messages, setMessages] = useContactMessages();
  const [openId, setOpenId] = useState(messages[0]?.id ?? null);
  const opened = messages.find((m) => m.id === openId);

  const open = (id) => {
    setOpenId(id);
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const remove = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setOpenId(null);
    toast("Message deleted.", "info");
  };

  return (
    <>
      <PageHeader eyebrow="Inbox" title="Messages" description={`Messages from the Contact page · ${messages.filter((m) => !m.read).length} unread`} />

      {messages.length === 0 ? (
        <EmptyState icon="ri-mail-line" title="Inbox is empty" text="New messages from the Contact page will show up here." />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            {messages.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => open(m.id)}
                className={`block w-full border-b border-gray-100 px-5 py-4 text-left transition last:border-0 ${openId === m.id ? "bg-primary/10" : "hover:bg-gray-50"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`truncate text-sm ${m.read ? "" : "font-semibold"}`}>{m.name}</span>
                  {!m.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary"></span>}
                </div>
                <p className="truncate text-sm text-gray-600">{m.subject}</p>
                <p className="text-xs text-gray-400">{m.date}</p>
              </button>
            ))}
          </div>

          {opened ? (
            <div key={opened.id} className="animate-fade-in rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-semibold">{opened.subject}</h2>
              <p className="mt-1 text-sm text-gray-400">
                {opened.name} · {opened.email} · {opened.date}
              </p>
              <p className="mt-6 whitespace-pre-line leading-7 text-gray-700">{opened.message}</p>
              <div className="mt-8 flex gap-3">
                <a href={`mailto:${opened.email}?subject=Re: ${encodeURIComponent(opened.subject)}`} className="inline-flex items-center gap-2 rounded-xl bg-[#10131d] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary">
                  <i className="ri-reply-line"></i> Reply by email
                </a>
                <Button variant="outline" icon="ri-delete-bin-line" onClick={() => remove(opened.id)}>Delete</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-300 p-10 text-sm text-gray-400">Select a message to read it.</div>
          )}
        </div>
      )}
    </>
  );
}

export default AdminMessages;
