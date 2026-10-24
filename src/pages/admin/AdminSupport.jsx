import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import DataTable from "../../components/admin/DataTable";
import { inputClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useCurrentUser } from "../../hooks/useAuth";
import { useTickets } from "../../hooks/usePlatformData";

const tabs = ["All", "Open", "Resolved"];
const priorityColor = { High: "text-red-500", Medium: "text-yellow-600", Low: "text-gray-500" };

function AdminSupport() {
  const toast = useToast();
  const user = useCurrentUser();
  const [tickets, setTickets] = useTickets();
  const [tab, setTab] = useState("Open");
  const [openId, setOpenId] = useState(null);
  const [reply, setReply] = useState("");

  const opened = tickets.find((t) => t.id === openId);
  const rows = tickets.filter((t) => tab === "All" || t.status === tab);

  const update = (id, changes) => setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, ...changes } : t)));

  const sendReply = (event) => {
    event.preventDefault();
    if (!reply.trim()) return;
    update(opened.id, { messages: [...opened.messages, { by: user.name, text: reply.trim(), at: new Date().toISOString().slice(0, 10) }] });
    setReply("");
    toast("Reply sent.");
  };

  const columns = [
    { key: "id", label: "Ticket", render: (t) => <span className="font-medium">{t.id}</span> },
    { key: "subject", label: "Subject", render: (t) => <span className="block max-w-[260px] truncate">{t.subject}</span> },
    { key: "from", label: "From", render: (t) => <span>{t.from} <span className="text-xs capitalize text-gray-400">({t.role})</span></span> },
    { key: "priority", label: "Priority", render: (t) => <span className={`text-xs font-semibold ${priorityColor[t.priority]}`}>{t.priority}</span> },
    { key: "status", label: "Status", render: (t) => <StatusBadge status={t.status} /> },
    { key: "open", label: "", render: (t) => <Button size="sm" variant="outline" onClick={() => setOpenId(t.id)}>Open</Button> },
  ];

  return (
    <>
      <PageHeader eyebrow="Help desk" title="Support Tickets" description="Answer questions from students and teachers." />
      <div className="mb-5">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} rows={rows} emptyText="No tickets here. 🎉" />

      <Modal
        open={Boolean(opened)}
        onClose={() => setOpenId(null)}
        title={opened?.subject}
        description={opened && `${opened.id} · ${opened.from}`}
        size="lg"
        footer={
          opened && (
            <Button
              variant={opened.status === "Open" ? "primary" : "outline"}
              icon={opened.status === "Open" ? "ri-check-double-line" : "ri-refresh-line"}
              onClick={() => {
                update(opened.id, { status: opened.status === "Open" ? "Resolved" : "Open" });
                toast(opened.status === "Open" ? "Ticket resolved." : "Ticket reopened.", "info");
              }}
            >
              {opened.status === "Open" ? "Mark as resolved" : "Reopen ticket"}
            </Button>
          )
        }
      >
        {opened && (
          <>
            <div className="space-y-3">
              {opened.messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.by === opened.from ? "bg-gray-100" : "ml-auto bg-primary/10"}`}>
                  <p className="text-xs font-semibold">{m.by} <span className="font-normal text-gray-400">· {m.at}</span></p>
                  <p className="mt-1 text-gray-700">{m.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={sendReply} className="mt-5 flex gap-2">
              <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write a reply..." className={inputClass} />
              <Button type="submit" icon="ri-send-plane-line" disabled={!reply.trim()}>Send</Button>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}

export default AdminSupport;
