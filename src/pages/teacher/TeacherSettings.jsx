
import { useEffect, useState } from "react";
import TeacherPageHeader from "../../components/teacher/TeacherPageHeader";

const defaultSettings = {
  emailNotifications: true,
  courseUpdates: true,
  studentMessages: true,
  assignmentAlerts: true,
  marketingEmails: false,
  profileVisibility: true,
  showEmail: false,
  showCourses: true,
  language: "English",
  timezone: "Asia/Kolkata",
  compactMode: false,
  weeklyReport: true,
};

const settingSections = [
  { id: "account", label: "Account", icon: "ri-user-settings-line" },
  { id: "notifications", label: "Notifications", icon: "ri-notification-3-line" },
  { id: "privacy", label: "Privacy", icon: "ri-shield-user-line" },
  { id: "preferences", label: "Preferences", icon: "ri-sliders-3-line" },
  { id: "security", label: "Security", icon: "ri-lock-password-line" },
];

function TeacherSettings() {
  const [activeTab, setActiveTab] = useState("account");
  const [settings, setSettings] = useState(defaultSettings);
  const [account, setAccount] = useState({
    fullName: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+91 98765 43210",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("teacherSettings");
      const savedAccount = localStorage.getItem("teacherAccountSettings");

      if (savedSettings) {
        setSettings({
          ...defaultSettings,
          ...JSON.parse(savedSettings),
        });
      }

      if (savedAccount) {
        setAccount((previous) => ({
          ...previous,
          ...JSON.parse(savedAccount),
        }));
      }
    } catch {
      setErrorMessage("Unable to load saved settings.");
    }
  }, []);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const updateAccount = (key, value) => {
    setAccount((previous) => ({
      ...previous,
      [key]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const saveSettings = () => {
    try {
      localStorage.setItem("teacherSettings", JSON.stringify(settings));
      localStorage.setItem(
        "teacherAccountSettings",
        JSON.stringify(account)
      );

      setSuccessMessage("Your settings have been saved on this device.");
      setErrorMessage("");
    } catch {
      setErrorMessage("Unable to save settings in browser storage.");
      setSuccessMessage("");
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage(
      "Password changes are not connected yet. Connect your authenticated backend to update your password securely."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const Toggle = ({ checked, onChange, label }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const SettingRow = ({
    title,
    description,
    checked,
    onChange,
  }) => (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-5 last:border-b-0">
      <div className="min-w-0">
        <h4 className="text-sm font-medium text-gray-800">{title}</h4>
        <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
      </div>

      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );

  const SectionTitle = ({ icon, title, description }) => (
    <div className="mb-6 flex items-start gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        <i className={`${icon} text-xl`} />
      </div>

      <div>
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-gray-500">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      <TeacherPageHeader
        title="Settings"
        description="Manage your account, notifications, privacy and dashboard preferences."
        buttonText="Save Changes"
        buttonIcon="ri-save-line"
        onButtonClick={saveSettings}
      />

      {/* Status Messages */}
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
        >
          <i className="ri-checkbox-circle-line mt-0.5 text-lg text-emerald-600" />

          <p className="flex-1 text-sm leading-6 text-emerald-800">
            {successMessage}
          </p>

          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss success message"
            className="text-emerald-700"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <i className="ri-error-warning-line mt-0.5 text-lg text-red-600" />

          <p className="flex-1 text-sm leading-6 text-red-700">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() => setErrorMessage("")}
            aria-label="Dismiss error message"
            className="text-red-700"
          >
            <i className="ri-close-line text-lg" />
          </button>
        </div>
      )}

      {/* Settings Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Settings Menu
          </p>

          <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {settingSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  setActiveTab(section.id);
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition lg:w-full ${
                  activeTab === section.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <i className={`${section.icon} text-lg`} />
                {section.label}

                {activeTab === section.id && (
                  <i className="ri-arrow-right-s-line ml-auto hidden text-lg lg:block" />
                )}
              </button>
            ))}
          </nav>

          <div className="mt-5 hidden rounded-xl bg-gray-50 p-4 lg:block">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
              <i className="ri-question-line text-xl" />
            </div>

            <h4 className="mt-3 text-sm font-semibold text-gray-800">
              Need help?
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Contact support if you need assistance with your account.
            </p>

            <a
              href="/teacher/support"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Contact Support
              <i className="ri-arrow-right-line" />
            </a>
          </div>
        </aside>

        {/* Main Settings */}
        <div className="min-w-0 space-y-6">
          {/* Account */}
          {activeTab === "account" && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle
                icon="ri-user-settings-line"
                title="Account Information"
                description="Manage your basic account details."
              />

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    value={account.fullName}
                    onChange={(event) =>
                      updateAccount("fullName", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={account.email}
                    onChange={(event) =>
                      updateAccount("email", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Changing this field does not change your login credentials.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={account.phone}
                    onChange={(event) =>
                      updateAccount("phone", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  />
                </div>

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <i className="ri-information-line mt-0.5 text-lg text-blue-600" />

                    <p className="text-sm leading-6 text-blue-800">
                      These details are saved in browser storage for this
                      demo. Account verification and email changes require
                      backend integration.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle
                icon="ri-notification-3-line"
                title="Notification Settings"
                description="Choose which types of updates you want to receive."
              />

              <SettingRow
                title="Email Notifications"
                description="Receive general account updates through email."
                checked={settings.emailNotifications}
                onChange={(value) => updateSetting("emailNotifications", value)}
              />

              <SettingRow
                title="Course Updates"
                description="Get updates related to your courses and lessons."
                checked={settings.courseUpdates}
                onChange={(value) => updateSetting("courseUpdates", value)}
              />

              <SettingRow
                title="Student Messages"
                description="Receive alerts when students contact you."
                checked={settings.studentMessages}
                onChange={(value) => updateSetting("studentMessages", value)}
              />

              <SettingRow
                title="Assignment Alerts"
                description="Get notified about assignment submissions and deadlines."
                checked={settings.assignmentAlerts}
                onChange={(value) => updateSetting("assignmentAlerts", value)}
              />

              <SettingRow
                title="Weekly Reports"
                description="Receive a weekly summary of your teaching activity."
                checked={settings.weeklyReport}
                onChange={(value) => updateSetting("weeklyReport", value)}
              />

              <SettingRow
                title="Product Updates"
                description="Receive occasional announcements about new platform features."
                checked={settings.marketingEmails}
                onChange={(value) => updateSetting("marketingEmails", value)}
              />

              <p className="mt-5 rounded-xl bg-gray-50 p-4 text-xs leading-5 text-gray-500">
                These switches save your preferences locally. They will not
                send or block actual emails until a notification service is
                connected.
              </p>
            </section>
          )}

          {/* Privacy */}
          {activeTab === "privacy" && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle
                icon="ri-shield-user-line"
                title="Privacy Settings"
                description="Control which parts of your teacher profile are visible."
              />

              <SettingRow
                title="Public Profile"
                description="Allow students to discover your teacher profile."
                checked={settings.profileVisibility}
                onChange={(value) => updateSetting("profileVisibility", value)}
              />

              <SettingRow
                title="Show Email Address"
                description="Allow your email address to appear on your public profile."
                checked={settings.showEmail}
                onChange={(value) => updateSetting("showEmail", value)}
              />

              <SettingRow
                title="Show Published Courses"
                description="Display your published courses on your public profile."
                checked={settings.showCourses}
                onChange={(value) => updateSetting("showCourses", value)}
              />

              <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <i className="ri-shield-keyhole-line mt-0.5 text-lg text-amber-700" />

                  <div>
                    <h4 className="text-sm font-semibold text-amber-900">
                      Privacy reminder
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      These preferences currently affect only the saved
                      settings data. Actual profile visibility must be
                      enforced by the backend.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
              <SectionTitle
                icon="ri-sliders-3-line"
                title="Dashboard Preferences"
                description="Personalize your language, timezone and dashboard layout."
              />

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="language"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Display Language
                  </label>

                  <select
                    id="language"
                    value={settings.language}
                    onChange={(event) =>
                      updateSetting("language", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                  </select>

                  <p className="mt-2 text-xs text-gray-400">
                    Saving a language preference does not automatically
                    translate the interface.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="timezone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Time Zone
                  </label>

                  <select
                    id="timezone"
                    value={settings.timezone}
                    onChange={(event) =>
                      updateSetting("timezone", event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                  >
                    <option value="Asia/Kolkata">
                      India Standard Time (IST)
                    </option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="America/New_York">
                      Eastern Time
                    </option>
                    <option value="Europe/London">
                      United Kingdom Time
                    </option>
                  </select>
                </div>

                <SettingRow
                  title="Compact Dashboard"
                  description="Save a preference for a more compact dashboard layout."
                  checked={settings.compactMode}
                  onChange={(value) => updateSetting("compactMode", value)}
                />

                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="text-sm font-medium text-gray-800">
                    Reset Preferences
                  </h4>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Restore the default notification, privacy and dashboard
                    preferences.
                  </p>

                  <button
                    type="button"
                    onClick={resetSettings}
                    className="mt-3 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                  >
                    <i className="ri-refresh-line" />
                    Reset Defaults
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <SectionTitle
                  icon="ri-lock-password-line"
                  title="Password & Security"
                  description="Manage your password and protect your account."
                />

                <form onSubmit={handlePasswordUpdate} className="space-y-5">
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Current Password
                    </label>

                    <input
                      id="currentPassword"
                      type="password"
                      autoComplete="current-password"
                      value={passwords.current}
                      onChange={(event) =>
                        setPasswords((previous) => ({
                          ...previous,
                          current: event.target.value,
                        }))
                      }
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>

                    <input
                      id="newPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.newPassword}
                      onChange={(event) =>
                        setPasswords((previous) => ({
                          ...previous,
                          newPassword: event.target.value,
                        }))
                      }
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                      placeholder="At least 8 characters"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>

                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      value={passwords.confirmPassword}
                      onChange={(event) =>
                        setPasswords((previous) => ({
                          ...previous,
                          confirmPassword: event.target.value,
                        }))
                      }
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                      placeholder="Confirm your new password"
                    />
                  </div>

                  {passwords.newPassword &&
                    passwords.confirmPassword &&
                    passwords.newPassword !== passwords.confirmPassword && (
                      <p className="text-sm text-red-600">
                        The new passwords do not match.
                      </p>
                    )}

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm leading-6 text-amber-800">
                      Password updates are not connected yet. This demo will
                      not change your actual account password.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      !passwords.current ||
                      passwords.newPassword.length < 8 ||
                      passwords.newPassword !== passwords.confirmPassword
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <i className="ri-lock-password-line text-lg" />
                    Update Password
                  </button>
                </form>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <i className="ri-shield-check-line text-xl" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Account Security
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      In production, security settings should include active
                      sessions, login history, two-factor authentication and
                      secure password reset functionality.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* Save Button */}
          {activeTab !== "security" && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-gray-400">
                Remember to save your changes before leaving this page.
              </p>

              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <i className="ri-save-line text-lg" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeacherSettings;
