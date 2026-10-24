import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Toggle from "../../components/common/Toggle";
import ConfirmModal from "../../components/common/ConfirmModal";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { usePlatformSettings } from "../../hooks/usePlatformData";
import { useCurrentUser } from "../../hooks/useAuth";
import { updateSessionUser } from "../../utils/auth";

const switches = [
  { key: "allowSignups", title: "Allow new sign-ups", text: "Turn off to stop new accounts from being created." },
  { key: "autoApproveCourses", title: "Auto-approve courses", text: "New teacher courses go live without review." },
  { key: "autoApproveTeachers", title: "Auto-approve teachers", text: "New teacher accounts are active right away." },
  { key: "emailNotifications", title: "Email notifications", text: "Send emails for payments, approvals and tickets." },
  { key: "maintenanceMode", title: "Maintenance mode", text: "Show a maintenance notice to visitors." },
];

function AdminSettings() {
  const toast = useToast();
  const user = useCurrentUser();
  const [settings, setSettings] = usePlatformSettings();
  const [draft, setDraft] = useState(settings);
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [resetOpen, setResetOpen] = useState(false);

  const save = (event) => {
    event.preventDefault();
    const commission = Number(draft.commission);
    if (!draft.siteName.trim() || commission < 0 || commission > 100) {
      toast("Enter a site name and a commission between 0 and 100.", "error");
      return;
    }
    setSettings({ ...draft, commission });
    toast("Platform settings saved.");
  };

  // Clears every demo record saved in this browser and reloads fresh data.
  const resetDemoData = () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith("myoc_") && key !== "myoc_user")
      .forEach((key) => localStorage.removeItem(key));
    toast("Demo data reset.", "info");
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <>
      <PageHeader eyebrow="System" title="Platform Settings" description="Control how the whole platform works." />

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <form onSubmit={save} className="space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-lg font-semibold">General</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="s-site">Site name</label>
                <input id="s-site" value={draft.siteName} onChange={(e) => setDraft({ ...draft, siteName: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="s-mail">Support email</label>
                <input id="s-mail" type="email" value={draft.supportEmail} onChange={(e) => setDraft({ ...draft, supportEmail: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="s-com">Platform commission (%)</label>
                <input id="s-com" type="number" min="0" max="100" value={draft.commission} onChange={(e) => setDraft({ ...draft, commission: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="s-cur">Currency</label>
                <select id="s-cur" value={draft.currency} onChange={(e) => setDraft({ ...draft, currency: e.target.value })} className={inputClass}>
                  {["INR", "USD", "EUR"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
            <h2 className="text-lg font-semibold">Controls</h2>
            <div className="mt-4">
              {switches.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-0">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.text}</p>
                  </div>
                  <Toggle label={item.title} checked={draft[item.key]} onChange={(value) => setDraft({ ...draft, [item.key]: value })} />
                </div>
              ))}
            </div>
          </section>

          <Button type="submit" size="lg" icon="ri-save-line">Save settings</Button>
        </form>

        <div className="space-y-6">
          <section className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Your admin profile</h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className={labelClass} htmlFor="a-name">Name</label>
                <input id="a-name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className={labelClass} htmlFor="a-email">Email</label>
                <input id="a-email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className={inputClass} />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  updateSessionUser(profile);
                  toast("Profile updated.");
                }}
              >
                Update profile
              </Button>
            </div>
          </section>

          <section className="rounded-3xl border border-red-200 bg-red-50/50 p-6">
            <h2 className="text-lg font-semibold text-red-600">Reset demo data</h2>
            <p className="mt-1 text-sm text-gray-500">Restore all courses, users and payments to the original demo data in this browser.</p>
            <Button variant="danger" className="mt-5" icon="ri-refresh-line" onClick={() => setResetOpen(true)}>Reset data</Button>
          </section>
        </div>
      </div>

      <ConfirmModal open={resetOpen} onClose={() => setResetOpen(false)} onConfirm={resetDemoData} title="Reset all demo data?" message="Every change you made in this browser (courses, users, payments, settings) will be lost." confirmText="Reset" danger />
    </>
  );
}

export default AdminSettings;
