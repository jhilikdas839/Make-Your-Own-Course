import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import ConfirmModal from "../../components/common/ConfirmModal";
import DataTable from "../../components/admin/DataTable";
import { useToast } from "../../components/common/toastContext";
import { usePlatformSettings, useTransactions } from "../../hooks/usePlatformData";
import { downloadCsv, formatPrice } from "../../utils/format";

const tabs = ["All", "Paid", "Pending", "Refunded", "Failed"];

function AdminPayments() {
  const toast = useToast();
  const [transactions, setTransactions] = useTransactions();
  const [settings] = usePlatformSettings();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [refund, setRefund] = useState(null);

  const rows = transactions.filter(
    (t) => (tab === "All" || t.status === tab) && `${t.id} ${t.student} ${t.course}`.toLowerCase().includes(search.toLowerCase())
  );
  const paid = transactions.filter((t) => t.status === "Paid").reduce((s, t) => s + t.amount, 0);
  const refunded = transactions.filter((t) => t.status === "Refunded").reduce((s, t) => s + t.amount, 0);

  const columns = [
    { key: "id", label: "Transaction", render: (t) => <span className="font-medium">{t.id}</span> },
    { key: "student", label: "Student" },
    { key: "course", label: "Course", render: (t) => <span className="block max-w-[220px] truncate">{t.course}</span> },
    { key: "amount", label: "Amount", render: (t) => <span className="font-semibold">{formatPrice(t.amount)}</span> },
    { key: "method", label: "Method", render: (t) => <span className="text-gray-500">{t.method}</span> },
    { key: "date", label: "Date", render: (t) => <span className="text-gray-500">{t.date}</span> },
    { key: "status", label: "Status", render: (t) => <StatusBadge status={t.status} /> },
    {
      key: "action",
      label: "",
      render: (t) =>
        t.status === "Paid" ? (
          <Button size="sm" variant="outline" onClick={() => setRefund(t)}>Refund</Button>
        ) : t.status === "Pending" ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setTransactions((prev) => prev.map((x) => (x.id === t.id ? { ...x, status: "Paid" } : x)));
              toast("Payment marked as paid.");
            }}
          >
            Mark paid
          </Button>
        ) : null,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Finance"
        title="Payments"
        description="Every course purchase on the platform."
        action={<Button variant="outline" icon="ri-download-2-line" onClick={() => downloadCsv("payments.csv", rows)}>Export CSV</Button>}
      />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total collected" value={formatPrice(paid)} icon="ri-money-rupee-circle-line" tone="green" />
        <StatCard label={`Platform share (${settings.commission}%)`} value={formatPrice(Math.round((paid * settings.commission) / 100))} icon="ri-percent-line" />
        <StatCard label="Refunded" value={formatPrice(refunded)} icon="ri-refund-2-line" tone="red" />
        <StatCard label="Transactions" value={transactions.length} icon="ri-exchange-dollar-line" tone="blue" />
      </section>

      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search payments..." className="w-full xl:w-80" />
      </div>

      <DataTable columns={columns} rows={rows} emptyText="No payments match your filters." />

      <ConfirmModal
        open={Boolean(refund)}
        onClose={() => setRefund(null)}
        onConfirm={() => {
          setTransactions((prev) => prev.map((x) => (x.id === refund.id ? { ...x, status: "Refunded" } : x)));
          toast(`${formatPrice(refund.amount)} refunded to ${refund.student}.`, "info");
        }}
        title="Refund this payment?"
        message={refund && `${formatPrice(refund.amount)} will be returned to ${refund.student} for "${refund.course}".`}
        confirmText="Refund"
        danger
      />
    </>
  );
}

export default AdminPayments;
