import { Link } from "react-router-dom";
import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/toastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { liveClasses } from "../../data/studentData";

function LiveClasses() {
  const toast = useToast();
  const [reminders, setReminders] = useLocalStorage("myoc_class_reminders", []);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const live = liveClasses.filter((item) => item.status === "Live Now");
  const upcoming = liveClasses.filter((item) => item.status === "Upcoming");
  const byDate = liveClasses.reduce((groups, item) => ({ ...groups, [item.date]: [...(groups[item.date] || []), item] }), {});

  const join = (item) => {
    window.open(item.link, "_blank", "noopener");
    toast(`Joining "${item.title}"...`, "info");
  };

  const toggleReminder = (item) => {
    const has = reminders.includes(item.id);
    setReminders((prev) => (has ? prev.filter((id) => id !== item.id) : [...prev, item.id]));
    toast(has ? "Reminder removed." : `We'll remind you before "${item.title}".`, has ? "info" : "success");
  };

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="Live Classes"
        description={`${live.length} class${live.length === 1 ? " is" : "es are"} live right now.`}
        action={<Button variant="outline" icon="ri-calendar-line" onClick={() => setCalendarOpen(true)}>View Calendar</Button>}
      />

      {live.map((item) => (
        <section key={item.id} className="relative mb-8 overflow-hidden rounded-3xl bg-[#10131d] p-6 text-white md:p-8">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary/20"></div>
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white"></span> LIVE
              </span>
              <h2 className="mt-4 text-2xl font-semibold md:text-3xl">{item.title}</h2>
              <p className="mt-2 text-sm text-white/60">
                {item.instructor} · {item.time} · {item.students} students
              </p>
            </div>
            <Button variant="primary" size="lg" icon="ri-live-line" onClick={() => join(item)}>Join Live Class</Button>
          </div>
        </section>
      ))}

      <h2 className="mb-5 text-2xl font-semibold">Upcoming Classes</h2>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {upcoming.map((item) => {
          const reminded = reminders.includes(item.id);
          return (
            <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <i className={`${item.icon} text-2xl text-primary`}></i>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">{item.status}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-400">{item.instructor}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="mt-1 font-medium">{item.date}</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-400">Time</p>
                  <p className="mt-1 font-medium">{item.time.split(" - ")[0]}</p>
                </div>
              </div>
              <Button
                variant={reminded ? "outline" : "dark"}
                className="mt-5 w-full"
                icon={reminded ? "ri-notification-off-line" : "ri-notification-3-line"}
                onClick={() => toggleReminder(item)}
              >
                {reminded ? "Reminder set" : "Set Reminder"}
              </Button>
            </div>
          );
        })}
      </div>

      <section className="mt-8 flex flex-col justify-between gap-4 rounded-3xl border border-gray-200 bg-white p-7 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-semibold">Missed a class?</h3>
          <p className="mt-1 text-sm text-gray-500">Watch the recordings any time.</p>
        </div>
        <Link to="/student/recordings" className="w-fit rounded-xl bg-[#10131d] px-5 py-3 text-sm font-medium text-white hover:bg-primary">
          Open Recordings
        </Link>
      </section>

      <Modal open={calendarOpen} onClose={() => setCalendarOpen(false)} title="Class calendar">
        <div className="space-y-5">
          {Object.entries(byDate).map(([date, items]) => (
            <div key={date}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{date}</p>
              {items.map((item) => (
                <div key={item.id} className="mb-2 flex items-center justify-between rounded-xl border border-gray-100 p-3">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                  {item.status === "Live Now" && <span className="text-xs font-semibold text-red-500">LIVE</span>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default LiveClasses;
