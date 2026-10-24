import useLocalStorage from "../../hooks/useLocalStorage";
import { useAnnouncements } from "../../hooks/usePlatformData";

// Shows the newest admin announcement for this audience ("Students" or "Teachers").
function AnnouncementBanner({ audience }) {
  const [announcements] = useAnnouncements();
  const [dismissed, setDismissed] = useLocalStorage("myoc_dismissed_announcements", []);

  const latest = announcements.find(
    (item) => (item.audience === "Everyone" || item.audience === audience) && !dismissed.includes(item.id)
  );
  if (!latest) return null;

  return (
    <div className="mb-6 flex animate-fade-in items-start gap-3 rounded-2xl bg-[#10131d] px-5 py-4 text-white">
      <i className="ri-megaphone-line mt-0.5 text-lg text-[#FDC700]"></i>
      <div className="flex-1">
        <p className="text-sm font-semibold">{latest.title}</p>
        <p className="mt-0.5 text-sm text-white/60">{latest.message}</p>
      </div>
      <button type="button" onClick={() => setDismissed((prev) => [...prev, latest.id])} aria-label="Dismiss announcement" className="text-white/50 hover:text-white">
        <i className="ri-close-line text-lg"></i>
      </button>
    </div>
  );
}

export default AnnouncementBanner;
