import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Tabs from "../../components/common/Tabs";
import SearchInput from "../../components/common/SearchInput";
import StatusBadge from "../../components/common/StatusBadge";
import Modal from "../../components/common/Modal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Button from "../../components/common/Button";
import DataTable from "../../components/admin/DataTable";
import IconButton from "../../components/admin/IconButton";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useUsers } from "../../hooks/usePlatformData";
import { downloadCsv } from "../../utils/format";
import { getInitials } from "../../utils/auth";

const tabs = ["All", "Students", "Teachers", "Admins", "Pending", "Blocked"];
const emptyForm = { id: null, name: "", email: "", role: "student", status: "Active" };

function AdminUsers() {
  const toast = useToast();
  const [users, setUsers] = useUsers();
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const matchesTab = (u) =>
    tab === "All" ||
    (tab === "Students" && u.role === "student") ||
    (tab === "Teachers" && u.role === "teacher") ||
    (tab === "Admins" && u.role === "admin") ||
    u.status === tab;

  const rows = users.filter((u) => matchesTab(u) && `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase()));

  const update = (id, changes, message) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...changes } : u)));
    if (message) toast(message);
  };

  const save = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      toast("Enter a name and a valid email.", "error");
      return;
    }
    if (users.some((u) => u.email === form.email && u.id !== form.id)) {
      toast("A user with this email already exists.", "error");
      return;
    }
    if (form.id) {
      update(form.id, form, "User updated.");
    } else {
      setUsers((prev) => [{ ...form, id: Date.now(), joined: new Date().toISOString().slice(0, 10), courses: 0 }, ...prev]);
      toast("User added.");
    }
    setForm(null);
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#10131d] text-xs font-bold text-white">{getInitials(u.name)}</span>
          <div>
            <p className="font-medium">{u.name}</p>
            <p className="text-xs text-gray-400">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (u) => (
        <select
          value={u.role}
          onChange={(e) => update(u.id, { role: e.target.value }, `${u.name} is now a ${e.target.value}.`)}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs capitalize outline-none focus:border-primary"
          aria-label={`Role of ${u.name}`}
        >
          {["student", "teacher", "admin"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      ),
    },
    { key: "joined", label: "Joined", render: (u) => <span className="text-gray-500">{u.joined}</span> },
    { key: "courses", label: "Courses" },
    { key: "status", label: "Status", render: (u) => <StatusBadge status={u.status} /> },
    {
      key: "actions",
      label: "Actions",
      render: (u) => (
        <div className="flex gap-1.5">
          {u.status === "Pending" && <IconButton icon="ri-check-line" label="Approve" tone="green" onClick={() => update(u.id, { status: "Active" }, `${u.name} approved.`)} />}
          {u.status !== "Blocked" ? (
            <IconButton icon="ri-forbid-line" label="Block" tone="red" disabled={u.role === "admin"} onClick={() => update(u.id, { status: "Blocked" }, `${u.name} blocked.`)} />
          ) : (
            <IconButton icon="ri-lock-unlock-line" label="Unblock" tone="green" onClick={() => update(u.id, { status: "Active" }, `${u.name} unblocked.`)} />
          )}
          <IconButton icon="ri-edit-line" label="Edit" tone="blue" onClick={() => setForm(u)} />
          <IconButton icon="ri-delete-bin-line" label="Delete" tone="red" disabled={u.role === "admin"} onClick={() => setDeleteUser(u)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Manage"
        title="Users"
        description="Approve, block, edit or remove students, teachers and admins."
        action={
          <div className="flex gap-2">
            <Button variant="outline" icon="ri-download-2-line" onClick={() => downloadCsv("users.csv", rows)}>Export</Button>
            <Button icon="ri-user-add-line" onClick={() => setForm(emptyForm)}>Add user</Button>
          </div>
        }
      />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Students" value={users.filter((u) => u.role === "student").length} icon="ri-user-3-line" />
        <StatCard label="Teachers" value={users.filter((u) => u.role === "teacher").length} icon="ri-presentation-line" tone="purple" />
        <StatCard label="Pending approval" value={users.filter((u) => u.status === "Pending").length} icon="ri-time-line" tone="yellow" />
        <StatCard label="Blocked" value={users.filter((u) => u.status === "Blocked").length} icon="ri-forbid-line" tone="red" />
      </section>

      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <Tabs tabs={tabs} active={tab} onChange={setTab} />
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email..." className="w-full xl:w-80" />
      </div>

      <DataTable columns={columns} rows={rows} emptyText="No users match your filters." />

      <Modal open={Boolean(form)} onClose={() => setForm(null)} title={form?.id ? "Edit user" : "Add user"}>
        {form && (
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className={labelClass} htmlFor="u-name">Full name</label>
              <input id="u-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            </div>
            <div>
              <label className={labelClass} htmlFor="u-email">Email</label>
              <input id="u-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} htmlFor="u-role">Role</label>
                <select id="u-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={`${inputClass} capitalize`}>
                  {["student", "teacher", "admin"].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} htmlFor="u-status">Status</label>
                <select id="u-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                  {["Active", "Pending", "Blocked"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full">{form.id ? "Save changes" : "Add user"}</Button>
          </form>
        )}
      </Modal>

      <ConfirmModal
        open={Boolean(deleteUser)}
        onClose={() => setDeleteUser(null)}
        onConfirm={() => {
          setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
          toast(`${deleteUser.name} deleted.`, "info");
        }}
        title="Delete this user?"
        message={deleteUser && `${deleteUser.name} will lose access to the platform. This can't be undone.`}
        confirmText="Delete user"
        danger
      />
    </>
  );
}

export default AdminUsers;
