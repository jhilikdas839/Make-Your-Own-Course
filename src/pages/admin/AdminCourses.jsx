import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import SafeImage from "../../components/common/SafeImage";
import ConfirmModal from "../../components/common/ConfirmModal";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import DataTable from "../../components/admin/DataTable";
import IconButton from "../../components/admin/IconButton";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useCourses } from "../../hooks/useCourses";
import { useCategories } from "../../hooks/usePlatformData";
import { levels } from "../../data/courses";
import { downloadCsv, formatPrice } from "../../utils/format";

const tabs = ["All", "Published", "Pending", "Draft", "Rejected"];

function AdminCourses() {
  const toast = useToast();
  const [courses, setCourses] = useCourses();
  const [categories] = useCategories();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);

  const rows = courses.filter(
    (c) => (tab === "All" || c.status === tab) && `${c.title} ${c.instructor} ${c.category}`.toLowerCase().includes(search.toLowerCase())
  );

  const update = (id, changes, message) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));
    if (message) toast(message);
  };

  const saveEdit = (event) => {
    event.preventDefault();
    if (!editing.title.trim()) {
      toast("The course needs a title.", "error");
      return;
    }
    update(editing.id, { ...editing, price: Number(editing.price) || 0 }, "Course updated.");
    setEditing(null);
  };

  const columns = [
    {
      key: "title",
      label: "Course",
      render: (c) => (
        <div className="flex items-center gap-3">
          <SafeImage src={c.image} alt="" icon={c.icon} className="h-11 w-16 shrink-0 rounded-lg object-cover" />
          <div className="min-w-0">
            <p className="max-w-[240px] truncate font-medium">{c.title}</p>
            <p className="text-xs text-gray-400">{c.instructor} · {c.category}</p>
          </div>
        </div>
      ),
    },
    { key: "price", label: "Price", render: (c) => formatPrice(c.price) },
    { key: "students", label: "Students", render: (c) => c.students.toLocaleString("en-IN") },
    { key: "status", label: "Status", render: (c) => <StatusBadge status={c.status} /> },
    {
      key: "featured",
      label: "Featured",
      render: (c) => (
        <button type="button" onClick={() => update(c.id, { featured: !c.featured }, c.featured ? "Removed from home page." : "Featured on home page.")} aria-label="Toggle featured">
          <i className={`text-xl ${c.featured ? "ri-star-fill text-yellow-400" : "ri-star-line text-gray-300 hover:text-yellow-400"}`}></i>
        </button>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (c) => (
        <div className="flex gap-1.5">
          {c.status !== "Published" && <IconButton icon="ri-check-line" label="Approve and publish" tone="green" onClick={() => update(c.id, { status: "Published" }, `"${c.title}" is now live.`)} />}
          {c.status === "Pending" && <IconButton icon="ri-close-line" label="Reject" tone="red" onClick={() => update(c.id, { status: "Rejected" }, `"${c.title}" rejected.`)} />}
          {c.status === "Published" && <IconButton icon="ri-eye-off-line" label="Unpublish" onClick={() => update(c.id, { status: "Draft" }, `"${c.title}" unpublished.`)} />}
          {c.status === "Published" && (
            <Link to={`/courses/${c.id}`} title="View on website" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100">
              <i className="ri-external-link-line"></i>
            </Link>
          )}
          <IconButton icon="ri-edit-line" label="Edit" tone="blue" onClick={() => setEditing(c)} />
          <IconButton icon="ri-delete-bin-line" label="Delete" tone="red" onClick={() => setDeleteCourse(c)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Manage"
        title="Courses"
        description="Review new courses, publish, feature or remove any course on the platform."
        action={<Button variant="outline" icon="ri-download-2-line" onClick={() => downloadCsv("courses.csv", rows.map(({ id, title, instructor, category, price, students, status }) => ({ id, title, instructor, category, price, students, status })))}>Export</Button>}
      />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="All courses" value={courses.length} icon="ri-book-open-line" />
        <StatCard label="Published" value={courses.filter((c) => c.status === "Published").length} icon="ri-checkbox-circle-line" tone="green" />
        <StatCard label="Waiting for review" value={courses.filter((c) => c.status === "Pending").length} icon="ri-time-line" tone="yellow" />
        <StatCard label="Featured" value={courses.filter((c) => c.featured).length} icon="ri-star-line" tone="purple" />
      </section>

      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search courses or instructors..." className="w-full xl:w-80" />
      </div>

      <DataTable columns={columns} rows={rows} emptyText="No courses match your filters." />

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Edit course" size="lg">
        {editing && (
          <form onSubmit={saveEdit} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="c-title">Title</label>
              <input id="c-title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-cat">Category</label>
              <select id="c-cat" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>
                {categories.map((cat) => <option key={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="c-level">Level</label>
              <select id="c-level" value={editing.level} onChange={(e) => setEditing({ ...editing, level: e.target.value })} className={inputClass}>
                {levels.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="c-price">Price (₹)</label>
              <input id="c-price" type="number" min="0" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-status">Status</label>
              <select id="c-status" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })} className={inputClass}>
                {tabs.slice(1).map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="c-desc">Description</label>
              <textarea id="c-desc" rows={3} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className={`${inputClass} resize-none`} />
            </div>
            <Button type="submit" size="lg" className="sm:col-span-2">Save changes</Button>
          </form>
        )}
      </Modal>

      <ConfirmModal
        open={Boolean(deleteCourse)}
        onClose={() => setDeleteCourse(null)}
        onConfirm={() => {
          setCourses((prev) => prev.filter((c) => c.id !== deleteCourse.id));
          toast("Course deleted.", "info");
        }}
        title="Delete this course?"
        message={deleteCourse && `"${deleteCourse.title}" will be removed for everyone, including enrolled students.`}
        confirmText="Delete course"
        danger
      />
    </>
  );
}

export default AdminCourses;
