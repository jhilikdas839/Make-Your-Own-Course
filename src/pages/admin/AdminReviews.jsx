import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import EmptyState from "../../components/common/EmptyState";
import IconButton from "../../components/admin/IconButton";
import { useToast } from "../../components/common/toastContext";
import { useReviews } from "../../hooks/usePlatformData";

const tabs = ["All", "Pending", "Visible", "Hidden"];

function AdminReviews() {
  const toast = useToast();
  const [reviews, setReviews] = useReviews();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");

  const rows = reviews.filter(
    (r) => (tab === "All" || r.status === tab) && `${r.student} ${r.course} ${r.comment}`.toLowerCase().includes(search.toLowerCase())
  );

  const setStatus = (id, status) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    toast(status === "Visible" ? "Review is now visible." : "Review hidden.", "info");
  };

  return (
    <>
      <PageHeader eyebrow="Moderation" title="Reviews" description="Approve genuine reviews and hide spam or abuse." />
      <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search reviews..." className="w-full md:w-80" />
      </div>

      {rows.length === 0 ? (
        <EmptyState icon="ri-star-line" title="No reviews here" />
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="flex animate-fade-in flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 md:flex-row md:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{r.student}</span>
                  <span className="text-yellow-400">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < r.rating ? "ri-star-fill" : "ri-star-line text-gray-300"}></i>
                    ))}
                  </span>
                  <StatusBadge status={r.status} />
                </div>
                <p className="mt-2 text-sm text-gray-600">“{r.comment}”</p>
                <p className="mt-1 text-xs text-gray-400">{r.course} · {r.date}</p>
              </div>
              <div className="flex gap-1.5">
                {r.status !== "Visible" && <IconButton icon="ri-check-line" label="Approve" tone="green" onClick={() => setStatus(r.id, "Visible")} />}
                {r.status !== "Hidden" && <IconButton icon="ri-eye-off-line" label="Hide" onClick={() => setStatus(r.id, "Hidden")} />}
                <IconButton
                  icon="ri-delete-bin-line"
                  label="Delete"
                  tone="red"
                  onClick={() => {
                    setReviews((prev) => prev.filter((x) => x.id !== r.id));
                    toast("Review deleted.", "info");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AdminReviews;
