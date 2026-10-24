import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import SearchInput from "../../components/common/SearchInput";
import EmptyState from "../../components/common/EmptyState";
import Modal from "../../components/common/Modal";
import useLocalStorage from "../../hooks/useLocalStorage";
import { recordings } from "../../data/studentData";

function Recordings() {
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState(null);
  const [watched, setWatched] = useLocalStorage("myoc_watched_recordings", []);

  const filtered = recordings.filter((item) =>
    `${item.title} ${item.course}`.toLowerCase().includes(search.toLowerCase())
  );

  const play = (item) => {
    setPlaying(item);
    if (!watched.includes(item.id)) setWatched((prev) => [...prev, item.id]);
  };

  return (
    <>
      <PageHeader
        eyebrow="Watch anytime"
        title="Recordings"
        description="Replays of your live classes. Learn at your own pace."
        action={<SearchInput value={search} onChange={setSearch} placeholder="Search recordings..." className="w-full md:w-72" />}
      />

      {filtered.length === 0 ? (
        <EmptyState icon="ri-video-line" title="No recordings found" />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => play(item)}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative flex h-40 items-center justify-center bg-[#10131d]">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/20"></div>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 transition group-hover:scale-110">
                  <i className="ri-play-fill text-3xl text-[#10131d]"></i>
                </span>
                <span className="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2 py-1 text-xs text-white">{item.duration}</span>
                {watched.includes(item.id) && (
                  <span className="absolute left-3 top-3 rounded-full bg-green-500 px-2.5 py-1 text-[11px] font-semibold text-white">Watched</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-400">
                  {item.course} · {item.date}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal open={Boolean(playing)} onClose={() => setPlaying(null)} title={playing?.title} description={playing?.course} size="xl">
        {playing && (
          <div className="aspect-video overflow-hidden rounded-2xl bg-black">
            <iframe src={playing.url} title={playing.title} className="h-full w-full" allowFullScreen></iframe>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Recordings;
