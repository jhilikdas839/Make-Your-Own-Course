
import { useState } from "react";
import TeacherPageHeader from "../../components/common/PageHeader";

const defaultProfile = {
  fullName: "John Doe",
  email: "teacher@myoc.dev",
  phone: "+91 98765 43210",
  headline: "Full Stack Developer & Online Educator",
  bio: "I help students learn web development through practical projects, real-world examples, and easy-to-follow lessons. My goal is to make technical concepts simple and accessible for everyone.",
  experience: "5",
  education: "B.Tech in Computer Science",
  location: "Kolkata, India",
  website: "https://example.com",
  linkedin: "https://linkedin.com",
  expertise: ["React.js", "JavaScript", "Node.js", "Tailwind CSS"],
  languages: ["English", "Hindi"],
};

// Reads saved JSON from localStorage, falling back to a default value.
function readSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? { ...fallback, ...JSON.parse(saved) } : fallback;
  } catch {
    return fallback;
  }
}

const Field = ({
  label,
  name,
  value,
  placeholder,
  type = "text",
  required = false,
  disabled,
  onChange,
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      {label}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>

    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={(event) => onChange(name, event.target.value)}
      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:bg-gray-50 disabled:text-gray-600"
    />
  </div>
);

function TeacherProfile() {
  const [profile, setProfile] = useState(() => {
    const saved = readSaved("teacherProfile", defaultProfile);
    return {
      ...saved,
      expertise: Array.isArray(saved.expertise) ? saved.expertise : defaultProfile.expertise,
      languages: Array.isArray(saved.languages) ? saved.languages : defaultProfile.languages,
    };
  });
  const [profileImage, setProfileImage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field, value) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const addSkill = () => {
    const skill = newSkill.trim();

    if (!skill) return;

    const alreadyExists = profile.expertise.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage("This skill has already been added.");
      return;
    }

    setProfile((previous) => ({
      ...previous,
      expertise: [...previous.expertise, skill],
    }));

    setNewSkill("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const removeSkill = (skillToRemove) => {
    setProfile((previous) => ({
      ...previous,
      expertise: previous.expertise.filter(
        (skill) => skill !== skillToRemove
      ),
    }));

    setSuccessMessage("");
  };

  const addLanguage = () => {
    const language = newLanguage.trim();

    if (!language) return;

    const alreadyExists = profile.languages.some(
      (item) => item.toLowerCase() === language.toLowerCase()
    );

    if (alreadyExists) {
      setErrorMessage("This language has already been added.");
      return;
    }

    setProfile((previous) => ({
      ...previous,
      languages: [...previous.languages, language],
    }));

    setNewLanguage("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const removeLanguage = (languageToRemove) => {
    setProfile((previous) => ({
      ...previous,
      languages: previous.languages.filter(
        (language) => language !== languageToRemove
      ),
    }));

    setSuccessMessage("");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfileImage((previous) => {
      if (previous) URL.revokeObjectURL(previous);
      return imageUrl;
    });

    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSave = (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!profile.fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!profile.email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const experience = Number(profile.experience);

    if (
      profile.experience === "" ||
      !Number.isInteger(experience) ||
      experience < 0 ||
      experience > 60
    ) {
      setErrorMessage("Please enter experience between 0 and 60 years.");
      return;
    }

    try {
      localStorage.setItem("teacherProfile", JSON.stringify(profile));

      setIsEditing(false);
      setSuccessMessage(
        "Profile saved successfully on this device."
      );
    } catch {
      setErrorMessage("Unable to save your profile in browser storage.");
    }
  };

  const handleCancel = () => {
    try {
      const savedProfile = localStorage.getItem("teacherProfile");

      if (savedProfile) {
        setProfile({
          ...defaultProfile,
          ...JSON.parse(savedProfile),
        });
      } else {
        setProfile(defaultProfile);
      }
    } catch {
      setProfile(defaultProfile);
    }

    setIsEditing(false);
    setNewSkill("");
    setNewLanguage("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const initials = profile.fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const completedFields = [
    profile.fullName,
    profile.email,
    profile.phone,
    profile.headline,
    profile.bio,
    profile.experience,
    profile.education,
    profile.location,
    profile.expertise.length > 0 ? "skills" : "",
    profile.languages.length > 0 ? "languages" : "",
  ].filter((value) => String(value).trim() !== "").length;

  const completion = completedFields * 10;

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Header */}
      <TeacherPageHeader
        title="My Profile"
        description="Manage your personal information and professional teaching profile."
        buttonText={isEditing ? "Cancel Editing" : "Edit Profile"}
        buttonIcon={isEditing ? "ri-close-line" : "ri-edit-line"}
        onButtonClick={() => {
          if (isEditing) {
            handleCancel();
          } else {
            setIsEditing(true);
            setSuccessMessage("");
            setErrorMessage("");
          }
        }}
      />

      {/* Notifications */}
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

      {/* Profile Hero */}
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="h-32 bg-gradient-to-r from-primary via-primary to-indigo-500 sm:h-40" />

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-primary/15 text-2xl font-semibold text-primary shadow-sm sm:h-28 sm:w-28">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials || "TM"
                )}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  {profile.fullName || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {profile.headline || "Add your professional headline"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-map-pin-line text-base" />
                    {profile.location || "Location not added"}
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <i className="ri-briefcase-3-line text-base" />
                    {profile.experience || 0} years experience
                  </span>
                </div>
              </div>
            </div>

            <div className="pb-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Teacher Account
              </span>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <label
                htmlFor="profile-photo"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <i className="ri-camera-line text-lg" />
                Upload Profile Photo
              </label>

              <input
                id="profile-photo"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />

              <p className="mt-2 text-xs text-gray-400">
                Image preview only. Maximum file size: 5 MB.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Profile Completion */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">
              Profile Completion
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Complete your profile to help students learn about you.
            </p>
          </div>

          <span className="text-2xl font-semibold text-primary">
            {completion}%
          </span>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${completion}%` }}
          />
        </div>

        <p className="mt-3 text-xs text-gray-500">
          Based on the information entered in this profile form.
        </p>
      </section>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <i className="ri-user-line text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Personal Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Your basic details and contact information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field disabled={!isEditing} onChange={updateField}
              label="Full Name"
              name="fullName"
              value={profile.fullName}
              placeholder="Enter your full name"
              required
            />

            <Field disabled={!isEditing} onChange={updateField}
              label="Email Address"
              name="email"
              value={profile.email}
              placeholder="Enter your email"
              type="email"
              required
            />

            <Field disabled={!isEditing} onChange={updateField}
              label="Phone Number"
              name="phone"
              value={profile.phone}
              placeholder="Enter your phone number"
              type="tel"
            />

            <Field disabled={!isEditing} onChange={updateField}
              label="Location"
              name="location"
              value={profile.location}
              placeholder="City, Country"
            />
          </div>
        </section>

        {/* Professional Information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <i className="ri-graduation-cap-line text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Professional Information
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Share your teaching background and expertise.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <Field disabled={!isEditing} onChange={updateField}
              label="Professional Headline"
              name="headline"
              value={profile.headline}
              placeholder="e.g. Full Stack Developer & Educator"
            />

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Professional Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                rows="5"
                value={profile.bio}
                disabled={!isEditing}
                onChange={(event) => updateField("bio", event.target.value)}
                placeholder="Tell students about your experience and teaching style..."
                className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-primary/40 focus:ring-2 focus:ring-primary/10 disabled:bg-gray-50 disabled:text-gray-600"
              />

              <p className="mt-2 text-xs text-gray-400">
                Explain your experience, teaching style, and areas of expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field disabled={!isEditing} onChange={updateField}
                label="Years of Experience"
                name="experience"
                value={profile.experience}
                placeholder="e.g. 5"
                type="number"
                required
              />

              <Field disabled={!isEditing} onChange={updateField}
                label="Highest Qualification"
                name="education"
                value={profile.education}
                placeholder="e.g. B.Tech in Computer Science"
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <i className="ri-code-s-slash-line text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Skills & Expertise
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Highlight the subjects and technologies you teach.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.expertise.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
              >
                {skill}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    aria-label={`Remove ${skill}`}
                    className="text-primary transition hover:text-red-600"
                  >
                    <i className="ri-close-line text-base" />
                  </button>
                )}
              </span>
            ))}

            {profile.expertise.length === 0 && (
              <p className="text-sm text-gray-400">
                No skills added yet.
              </p>
            )}
          </div>

          {isEditing && (
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={newSkill}
                onChange={(event) => setNewSkill(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Enter a skill, e.g. React.js"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <i className="ri-add-line text-lg" />
                Add Skill
              </button>
            </div>
          )}
        </section>

        {/* Languages */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <i className="ri-translate-2 text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Languages
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Languages you can use to teach your students.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.languages.map((language) => (
              <span
                key={language}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
              >
                {language}

                {isEditing && (
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    aria-label={`Remove ${language}`}
                    className="text-emerald-600 transition hover:text-red-600"
                  >
                    <i className="ri-close-line text-base" />
                  </button>
                )}
              </span>
            ))}

            {profile.languages.length === 0 && (
              <p className="text-sm text-gray-400">
                No languages added yet.
              </p>
            )}
          </div>

          {isEditing && (
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={newLanguage}
                onChange={(event) => setNewLanguage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addLanguage();
                  }
                }}
                placeholder="Enter a language"
                className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
              />

              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <i className="ri-add-line text-lg" />
                Add Language
              </button>
            </div>
          )}
        </section>

        {/* Social Links */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <i className="ri-links-line text-xl" />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Website & Social Links
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Let students explore your professional work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field disabled={!isEditing} onChange={updateField}
              label="Personal Website"
              name="website"
              value={profile.website}
              placeholder="https://example.com"
              type="url"
            />

            <Field disabled={!isEditing} onChange={updateField}
              label="LinkedIn Profile"
              name="linkedin"
              value={profile.linkedin}
              placeholder="https://linkedin.com/in/username"
              type="url"
            />
          </div>
        </section>

        {/* Save Actions */}
        {isEditing && (
          <div className="sticky bottom-4 z-10 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white/95 p-4 shadow-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-gray-500">
              Changes are saved in this browser only.
            </p>

            <div className="flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary/90"
              >
                <i className="ri-save-line text-lg" />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Footer Note */}
      <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4">
        <i className="ri-shield-check-line mt-0.5 text-lg text-gray-500" />

        <p className="text-xs leading-6 text-gray-500">
          Your profile information is currently stored in this browser's
          local storage. This is a frontend demo, not a secure account
          management system. Connect your authenticated backend before
          storing real teacher account information.
        </p>
      </div>
    </div>
  );
}

export default TeacherProfile;
