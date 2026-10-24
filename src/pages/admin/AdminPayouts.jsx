import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import StatusBadge from "../../components/common/StatusBadge";
import DataTable from "../../components/admin/DataTable";
import IconButton from "../../components/admin/IconButton";
import { useToast } from "../../components/common/toastContext";
import { usePayouts } from "../../hooks/usePlatformData";
import { formatPrice } from "../../utils/format";

const tabs = ["All", "Pending", "Paid", "Rejected"];

function AdminPayouts() {
  const toast = useToast();
  const [payouts, setPayouts] = usePayouts();
  const [tab, setTab] = useState("Pending");

  const rows = payouts.filter((p) => tab === "All" || p.status === tab);
  const sum = (status) => payouts.filter((p) => p.status === status).reduce((s, p) => s + p.amount, 0);

  const decide = (payout, status) => {
    setPayouts((prev) => prev.map((p) => (p.id === payout.id ? { ...p, status } : p)));
    toast(status === "Paid" ? `${formatPrice(payout.amount)} paid to ${payout.teacher}.` : `Payout to ${payout.teacher} rejected.`, status === "Paid" ? "success" : "info");
  };

  const columns = [
    { key: "id", label: "Request", render: (p) => <span className="font-medium">{p.id}</span> },
    { key: "teacher", label: "Teacher" },
    { key: "amount", label: "Amount", render: (p) => <span className="font-semibold">{formatPrice(p.amount)}</span> },
    { key: "method", label: "Method", render: (p) => <span className="text-gray-500">{p.method}</span> },
    { key: "requested", label: "Requested", render: (p) => <span className="text-gray-500">{p.requested}</span> },
    { key: "status", label: "Status", render: (p) => <StatusBadge status={p.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (p) =>
        p.status === "Pending" && (
          <div className="flex gap-1.5">
            <IconButton icon="ri-check-line" label="Approve and pay" tone="green" onClick={() => decide(p, "Paid")} />
            <IconButton icon="ri-close-line" label="Reject" tone="red" onClick={() => decide(p, "Rejected")} />
          </div>
        ),
    },
  ];

  return (
    <>
      <PageHeader eyebrow="Finance" title="Teacher Payouts" description="Approve or reject payout requests from teachers." />
      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard label="Waiting to be paid" value={formatPrice(sum("Pending"))} icon="ri-time-line" tone="yellow" />
        <StatCard label="Paid out" value={formatPrice(sum("Paid"))} icon="ri-bank-card-line" tone="green" />
        <StatCard label="Requests" value={payouts.length} icon="ri-file-list-3-line" />
      </section>
      <div className="mb-5">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
      </div>
      <DataTable columns={columns} rows={rows} emptyText="No payout requests here." />
    </>
  );
}

export default AdminPayouts;
