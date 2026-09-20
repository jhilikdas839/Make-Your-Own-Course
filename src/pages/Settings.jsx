import React, { useState } from "react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      name: "Profile",
      value: "profile",
      icon: "ri-user-line",
    },
    {
      name: "Security",
      value: "security",
      icon: "ri-lock-line",
    },
    {
      name: "Notifications",
      value: "notifications",
      icon: "ri-notification-3-line",
    },
    {
      name: "Preferences",
      value: "preferences",
      icon: "ri-sliders-3-line",
    },
  ];

  return (
    <div className="p-5 md:p-8">

      {/* =====================================
          PAGE HEADER
      ===================================== */}
      <div className="mb-8">
        <p className="text-xs text-gray-400 mb-1">
          Account
        </p>

        <h1 className="text-2xl md:text-3xl font-bold text-[#10131d]">
          Settings
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Manage your account, security and learning preferences.
        </p>
      </div>


      {/* =====================================
          SETTINGS LAYOUT
      ===================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

        {/* =====================================
            SETTINGS TABS
        ===================================== */}
        <div className="bg-white border border-gray-200 rounded-2xl p-3 h-fit">

          <div className="space-y-1">

            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm text-left transition ${
                  activeTab === tab.value
                    ? "bg-[#168ee5] text-[#10131d] font-semibold"
                    : "text-[#687386] hover:bg-gray-50"
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>

                <span>{tab.name}</span>
              </button>
            ))}

          </div>

        </div>


        {/* =====================================
            SETTINGS CONTENT
        ===================================== */}
        <div>


          {/* =====================================
              PROFILE
          ===================================== */}
          {activeTab === "profile" && (
            <div className="space-y-6">

              {/* Profile Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

                <div className="mb-7">
                  <h2 className="text-lg font-bold text-[#10131d]">
                    Profile Information
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Update your personal information.
                  </p>
                </div>


                {/* Avatar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">

                  <div className="w-20 h-20 rounded-full bg-[#10131d] text-white flex items-center justify-center text-xl font-bold">
                    JS
                  </div>

                  <div>
                    <button className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition">
                      Change Photo
                    </button>

                    <p className="text-xs text-gray-400 mt-2">
                      JPG, PNG or WEBP. Max 2MB.
                    </p>
                  </div>

                </div>


                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-[#10131d] mb-2">
                      First Name
                    </label>

                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5] transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-[#10131d] mb-2">
                      Last Name
                    </label>

                    <input
                      type="text"
                      defaultValue="Smith"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5] transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-[#10131d] mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5] transition"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-[#10131d] mb-2">
                      Phone Number
                    </label>

                    <input
                      type="text"
                      defaultValue="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5] transition"
                    />
                  </div>

                </div>


                {/* Save */}
                <div className="flex justify-end mt-7 pt-6 border-t border-gray-100">

                  <button className="px-6 py-3 rounded-xl bg-[#168ee5] text-[#10131d] text-sm font-semibold hover:opacity-90 transition">
                    Save Changes
                  </button>

                </div>

              </div>


              {/* Account Information */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

                <h2 className="text-lg font-bold text-[#10131d]">
                  Account Information
                </h2>

                <p className="text-sm text-gray-500 mt-1 mb-6">
                  Basic information about your account.
                </p>

                <div className="space-y-4">

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">

                    <div>
                      <p className="text-xs text-gray-400">
                        Account Type
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        Student
                      </p>
                    </div>

                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600">
                      Student
                    </span>

                  </div>


                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">

                    <div>
                      <p className="text-xs text-gray-400">
                        Member Since
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        January 2026
                      </p>
                    </div>

                    <i className="ri-calendar-line text-gray-400 text-xl"></i>

                  </div>

                </div>

              </div>

            </div>
          )}


          {/* =====================================
              SECURITY
          ===================================== */}
          {activeTab === "security" && (
            <div className="space-y-6">

              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

                <div className="mb-7">
                  <h2 className="text-lg font-bold text-[#10131d]">
                    Password & Security
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Keep your account secure with a strong password.
                  </p>
                </div>


                <div className="space-y-5">

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5]"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>

                    <input
                      type="password"
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5]"
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>

                    <input
                      type="password"
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5]"
                    />
                  </div>

                </div>


                <div className="flex justify-end mt-7 pt-6 border-t border-gray-100">

                  <button className="px-6 py-3 rounded-xl bg-[#168ee5] text-[#10131d] text-sm font-semibold">
                    Update Password
                  </button>

                </div>

              </div>


              {/* Two Factor */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">

                <div className="flex items-start justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <i className="ri-shield-check-line text-green-600 text-xl"></i>
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        Two-Factor Authentication
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Add an extra layer of security to your account.
                      </p>
                    </div>

                  </div>

                  <button className="text-sm font-semibold text-[#168ee5]">
                    Enable
                  </button>

                </div>

              </div>

            </div>
          )}


          {/* =====================================
              NOTIFICATIONS
          ===================================== */}
          {activeTab === "notifications" && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

              <div className="mb-7">
                <h2 className="text-lg font-bold text-[#10131d]">
                  Notification Settings
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Choose what notifications you want to receive.
                </p>
              </div>


              <div className="divide-y divide-gray-100">

                <NotificationItem
                  title="Course Updates"
                  description="Get notified about new lessons and course updates."
                />

                <NotificationItem
                  title="Live Class Reminders"
                  description="Receive reminders before your live classes."
                />

                <NotificationItem
                  title="Assessment Reminders"
                  description="Get notified about upcoming assessments."
                />

                <NotificationItem
                  title="Community Activity"
                  description="Stay updated with replies and community discussions."
                />

                <NotificationItem
                  title="Marketing Emails"
                  description="Receive occasional offers and platform updates."
                />

              </div>

            </div>
          )}


          {/* =====================================
              PREFERENCES
          ===================================== */}
          {activeTab === "preferences" && (
            <div className="space-y-6">

              <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">

                <div className="mb-7">
                  <h2 className="text-lg font-bold text-[#10131d]">
                    Learning Preferences
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Customize your learning experience.
                  </p>
                </div>


                {/* Language */}
                <div className="mb-6">

                  <label className="block text-sm font-semibold mb-2">
                    Language
                  </label>

                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#168ee5]">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Bengali</option>
                  </select>

                </div>


                {/* Learning Reminder */}
                <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl mb-4">

                  <div>
                    <p className="text-sm font-semibold">
                      Daily Learning Reminder
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Remind me to continue my learning every day.
                    </p>
                  </div>

                  <div className="w-11 h-6 rounded-full bg-[#168ee5] p-1 flex justify-end">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                </div>


                {/* Auto Play */}
                <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">

                  <div>
                    <p className="text-sm font-semibold">
                      Auto Play Next Lesson
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Automatically start the next lesson.
                    </p>
                  </div>

                  <div className="w-11 h-6 rounded-full bg-gray-200 p-1">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>

                </div>


                <div className="flex justify-end mt-7 pt-6 border-t border-gray-100">

                  <button className="px-6 py-3 rounded-xl bg-[#168ee5] text-[#10131d] text-sm font-semibold">
                    Save Preferences
                  </button>

                </div>

              </div>


              {/* Danger Zone */}
              <div className="bg-white border border-red-100 rounded-2xl p-6 md:p-8">

                <h2 className="text-lg font-bold text-red-600">
                  Danger Zone
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  These actions can permanently affect your account.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-xl bg-red-50">

                  <div>
                    <p className="text-sm font-semibold text-red-700">
                      Delete Account
                    </p>

                    <p className="text-xs text-red-600/70 mt-1">
                      Permanently delete your account and learning data.
                    </p>
                  </div>

                  <button className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 text-sm font-semibold hover:bg-red-100 transition">
                    Delete Account
                  </button>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};


/* =====================================
    NOTIFICATION COMPONENT
===================================== */

const NotificationItem = ({ title, description }) => {
  return (
    <div className="flex items-center justify-between gap-5 py-5">

      <div>
        <p className="text-sm font-semibold text-[#10131d]">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <div className="w-11 h-6 rounded-full bg-[#168ee5] p-1 flex justify-end flex-shrink-0 cursor-pointer">
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>

    </div>
  );
};


export default Settings;