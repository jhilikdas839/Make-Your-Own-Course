import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/common/Button";
import Toggle from "../../components/common/Toggle";
import ConfirmModal from "../../components/common/ConfirmModal";
import { Avatar } from "../../components/common/PanelSidebar";
import { inputClass, labelClass } from "../../components/common/formStyles";
import { useToast } from "../../components/common/toastContext";
import { useCurrentUser } from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";
import { clearSession, updateSessionUser } from "../../utils/auth";

const tabs = [
  { name: "Profile", value: "profile", icon: "ri-user-line" },
  { name: "Security", value: "security", icon: "ri-lock-line" },
  { name: "Notifications", value: "notifications", icon: "ri-notification-3-line" },
  { name: "Preferences", value: "preferences", icon: "ri-sliders-3-line" },
];

const notificationOptions = [
  { key: "courseUpdates", title: "Course updates", text: "New lessons and changes in your courses." },
  { key: "liveClasses", title: "Live class reminders", text: "A reminder 15 minutes before a class starts." },
  { key: "assessments", title: "Assessment results", text: "When your scores are ready." },
  { key: "community", title: "Community replies", text: "When someone replies to your discussion." },
  { key: "offers", title: "Offers and news", text: "Discounts and new courses." },
];

const defaultPrefs = {
  notifications: { courseUpdates: true, liveClasses: true, assessments: true, community: false, offers: false },
  language: "English",
  dailyReminder: true,
  autoPlay: true,
  twoFactor: false,
};

const Card = ({ title, text, children }) => (
  <section className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8">
    <h2 className="text-lg font-semibold">{title}</h2>
    {text && <p className="mt-1 text-sm text-gray-400">{text}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

const Row = ({ title, text, children }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-4 last:border-0">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
    {children}
  </div>
);

function Settings() {
  const toast = useToast();
  const navigate = useNavigate();
  const user = useCurrentUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [prefs, setPrefs] = useLocalStorage("myoc_student_prefs", defaultPrefs);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [profile, setProfile] = useState({ name: user.name, email: user.email, phone: user.phone || "", bio: user.bio || "" });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const saveProfile = (event) => {
    event.preventDefault();
    if (!profile.name.trim() || !/^\S+@\S+\.\S+$/.test(profile.email)) {
      toast("Enter your name and a valid email.", "error");
      return;
    }
    updateSessionUser(profile);
    toast("Profile saved.");
  };

  const changePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("Please choose an image under 2 MB.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      updateSessionUser({ avatar: reader.result });
      toast("Photo updated.");
    };
    reader.readAsDataURL(file);
  };

  const updatePassword = (event) => {
    event.preventDefault();
    if (!passwords.current) return toast("Enter your current password.", "error");
    if (passwords.next.length < 8) return toast("New password must be at least 8 characters.", "error");
    if (passwords.next !== passwords.confirm) return toast("New passwords don't match.", "error");
    // TODO: send to the backend "change password" endpoint.
    setPasswords({ current: "", next: "", confirm: "" });
    toast("Password updated.");
  };

  const deleteAccount = () => {
    clearSession();
    toast("Your account has been deleted.", "info");
    navigate("/");
  };

  return (
    <>
      <PageHeader eyebrow="Account" title="Settings" description="Manage your account, security and learning preferences." />

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition ${
                activeTab === tab.value ? "bg-[#10131d] text-white" : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <i className={tab.icon}></i>
              {tab.name}
            </button>
          ))}
        </nav>

        <div key={activeTab} className="animate-fade-in space-y-6">
          {activeTab === "profile" && (
            <Card title="Profile Information" text="Update your personal information.">
              <div className="mb-6 flex items-center gap-5">
                <Avatar user={user} size="h-20 w-20" />
                <div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
                    <i className="ri-camera-line"></i> Change Photo
                    <input type="file" accept="image/png,image/jpeg,image/webp" onChange={changePhoto} className="hidden" />
                  </label>
                  <p className="mt-2 text-xs text-gray-400">JPG, PNG or WEBP. Max 2 MB.</p>
                </div>
              </div>
              <form onSubmit={saveProfile} className="grid gap-5 md:grid-cols-2">
                {[
                  ["name", "Full Name", "text"],
                  ["email", "Email Address", "email"],
                  ["phone", "Phone Number", "tel"],
                ].map(([key, label, type]) => (
                  <div key={key}>
                    <label className={labelClass} htmlFor={`p-${key}`}>{label}</label>
                    <input id={`p-${key}`} type={type} value={profile[key]} onChange={(e) => setProfile({ ...profile, [key]: e.target.value })} className={inputClass} />
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className={labelClass} htmlFor="p-bio">About you</label>
                  <textarea id="p-bio" rows={3} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} className={`${inputClass} resize-none`} />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" size="lg">Save Changes</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "security" && (
            <>
              <Card title="Password" text="Use at least 8 characters.">
                <form onSubmit={updatePassword} className="grid gap-5 md:max-w-md">
                  {[
                    ["current", "Current Password"],
                    ["next", "New Password"],
                    ["confirm", "Confirm New Password"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className={labelClass} htmlFor={`pw-${key}`}>{label}</label>
                      <input id={`pw-${key}`} type="password" value={passwords[key]} onChange={(e) => setPasswords({ ...passwords, [key]: e.target.value })} className={inputClass} />
                    </div>
                  ))}
                  <Button type="submit" className="w-fit">Update Password</Button>
                </form>
              </Card>
              <Card title="Two-Factor Authentication" text="Add an extra layer of security to your account.">
                <Row title="Authenticator app" text={prefs.twoFactor ? "Enabled" : "Not enabled"}>
                  <Toggle
                    label="Two-factor authentication"
                    checked={prefs.twoFactor}
                    onChange={(value) => {
                      setPrefs({ ...prefs, twoFactor: value });
                      toast(value ? "Two-factor authentication enabled." : "Two-factor authentication disabled.", "info");
                    }}
                  />
                </Row>
              </Card>
            </>
          )}

          {activeTab === "notifications" && (
            <Card title="Notification Settings" text="Choose what you want to hear about. Changes save automatically.">
              {notificationOptions.map((option) => (
                <Row key={option.key} title={option.title} text={option.text}>
                  <Toggle
                    label={option.title}
                    checked={prefs.notifications[option.key]}
                    onChange={(value) => setPrefs({ ...prefs, notifications: { ...prefs.notifications, [option.key]: value } })}
                  />
                </Row>
              ))}
            </Card>
          )}

          {activeTab === "preferences" && (
            <>
              <Card title="Learning Preferences" text="Customize your learning experience. Changes save automatically.">
                <div className="mb-4 md:max-w-xs">
                  <label className={labelClass} htmlFor="lang">Language</label>
                  <select id="lang" value={prefs.language} onChange={(e) => setPrefs({ ...prefs, language: e.target.value })} className={inputClass}>
                    {["English", "Hindi", "Bengali"].map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <Row title="Daily learning reminder" text="Remind me to continue learning every day.">
                  <Toggle label="Daily reminder" checked={prefs.dailyReminder} onChange={(v) => setPrefs({ ...prefs, dailyReminder: v })} />
                </Row>
                <Row title="Auto-play next lesson" text="Start the next lesson automatically.">
                  <Toggle label="Auto-play" checked={prefs.autoPlay} onChange={(v) => setPrefs({ ...prefs, autoPlay: v })} />
                </Row>
              </Card>
              <section className="rounded-3xl border border-red-200 bg-red-50/50 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
                <p className="mt-1 text-sm text-gray-500">Deleting your account removes your courses and progress permanently.</p>
                <Button variant="danger" className="mt-5" icon="ri-delete-bin-line" onClick={() => setDeleteOpen(true)}>Delete Account</Button>
              </section>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteAccount}
        title="Delete your account?"
        message="This can't be undone. All your courses, progress and certificates will be removed."
        confirmText="Delete account"
        danger
      />
    </>
  );
}

export default Settings;
