import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import EmptyState from "../../components/common/EmptyState";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/toastContext";
import { resources } from "../../data/studentData";
import { downloadTextFile } from "../../utils/format";

const tabs = ["All", "PDF", "Document", "Video"];

function Library() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState(null);

  const term = search.toLowerCase();
  const filtered = resources.filter(
    (item) =>
      (activeTab === "All" || item.type === activeTab) &&
      (item.title.toLowerCase().includes(term) || item.category.toLowerCase().includes(term))
  );
  const count = (type) => resources.filter((item) => item.type === type).length;

  const open = (item) => {
    if (item.type === "Video") {
      setPlaying(item);
      return;
    }
    // Demo download: creates a small text file. Replace with the real file URL from the backend.
    downloadTextFile(`${item.title}.txt`, `${item.title}\nCategory: ${item.category}\n\nThis is a sample resource from Make Your Own Course.`);
    toast(`Downloading "${item.title}"`);
  };

  return (
    <>
      <PageHeader eyebrow="Resources" title="Library" description="Notes, guides and videos for your courses." />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Resources" value={resources.length} icon="ri-folder-open-line" />
        <StatCard label="PDF Files" value={count("PDF")} icon="ri-file-pdf-2-line" tone="red" />
        <StatCard label="Documents" value={count("Document")} icon="ri-file-text-line" tone="blue" />
        <StatCard label="Videos" value={count("Video")} icon="ri-video-line" tone="purple" />
      </section>

      <section className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search resources..." className="w-full md:w-72" />
      </section>

      {filtered.length === 0 ? (
        <EmptyState icon="ri-folder-open-line" title="No resources found" text="Try searching with another keyword." />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <i className={`${item.icon} text-2xl text-primary`}></i>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">{item.type}</span>
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-1 text-xs text-gray-400">
                {item.category} · {item.size}
              </p>
              <Button className="mt-5 w-full" icon={item.type === "Video" ? "ri-play-circle-line" : "ri-download-2-line"} onClick={() => open(item)}>
                {item.type === "Video" ? "Watch Video" : "Download Resource"}
              </Button>
            </div>
          ))}
        </div>
      )}

      <Modal open={Boolean(playing)} onClose={() => setPlaying(null)} title={playing?.title} size="xl">
        {playing && (
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            <iframe src={playing.url} title={playing.title} className="h-full w-full" allowFullScreen></iframe>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Library;
