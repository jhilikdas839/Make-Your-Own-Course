import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Button from "../../components/common/Button";
import IconButton from "../../components/admin/IconButton";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useCategories } from "../../hooks/usePlatformData";
import { useCourses } from "../../hooks/useCourses";

const iconChoices = ["ri-code-s-slash-line", "ri-palette-line", "ri-terminal-box-line", "ri-bar-chart-box-line", "ri-megaphone-line", "ri-briefcase-line", "ri-camera-line", "ri-music-2-line", "ri-translate-2", "ri-heart-pulse-line"];

function AdminCategories() {
  const toast = useToast();
  const [categories, setCategories] = useCategories();
  const [courses, setCourses] = useCourses();
  const [form, setForm] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const countFor = (name) => courses.filter((c) => c.category === name).length;

  const save = (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) return toast("Enter a category name.", "error");
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== form.id)) {
      return toast("This category already exists.", "error");
    }
    if (form.id) {
      const old = categories.find((c) => c.id === form.id);
      setCategories((prev) => prev.map((c) => (c.id === form.id ? { ...form, name } : c)));
      // Keep courses pointing to the renamed category.
      setCourses((prev) => prev.map((c) => (c.category === old.name ? { ...c, category: name } : c)));
      toast("Category updated.");
    } else {
      setCategories((prev) => [...prev, { ...form, name, id: Date.now() }]);
      toast("Category added.");
    }
    setForm(null);
  };

  return (
    <>
      <PageHeader eyebrow="Manage" title="Categories" description="Organise courses into categories shown on the website." buttonText="Add category" buttonIcon="ri-add-line" onButtonClick={() => setForm({ id: null, name: "", icon: iconChoices[0] })} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="flex animate-fade-in items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <i className={`${category.icon} text-2xl text-primary`}></i>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{category.name}</p>
              <p className="text-xs text-gray-400">{countFor(category.name)} courses</p>
            </div>
            <IconButton icon="ri-edit-line" label="Edit" tone="blue" onClick={() => setForm(category)} />
            <IconButton icon="ri-delete-bin-line" label="Delete" tone="red" onClick={() => setToDelete(category)} />
          </div>
        ))}
      </div>

      <Modal open={Boolean(form)} onClose={() => setForm(null)} title={form?.id ? "Edit category" : "Add category"} size="sm">
        {form && (
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="cat-name">Name</label>
              <input id="cat-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} autoFocus />
            </div>
            <div>
              <p className={labelClass}>Icon</p>
              <div className="grid grid-cols-5 gap-2">
                {iconChoices.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm({ ...form, icon })}
                    aria-label={icon}
                    className={`flex h-11 items-center justify-center rounded-xl border text-xl transition ${form.icon === icon ? "border-primary bg-primary/10 text-primary" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <i className={icon}></i>
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">Save category</Button>
          </form>
        )}
      </Modal>

      <ConfirmModal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        onConfirm={() => {
          if (countFor(toDelete.name) > 0) {
            toast("Move or delete the courses in this category first.", "error");
            return;
          }
          setCategories((prev) => prev.filter((c) => c.id !== toDelete.id));
          toast("Category deleted.", "info");
        }}
        title="Delete this category?"
        message={toDelete && `"${toDelete.name}" has ${countFor(toDelete.name)} courses. Categories with courses can't be deleted.`}
        confirmText="Delete"
        danger
      />
    </>
  );
}

export default AdminCategories;
