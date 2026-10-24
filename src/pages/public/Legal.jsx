import PageHero from "../../components/public/PageHero";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      ["What we collect", "Your name, email address and the courses you take. If you buy a course, our payment partner processes your payment details; we never store full card numbers."],
      ["How we use it", "To run your account, show your progress, send course updates and improve our courses. We never sell your personal data."],
      ["Cookies", "We use cookies and browser storage to keep you logged in and remember your preferences."],
      ["Your choices", "You can update your profile, turn off emails in Settings, or ask us to delete your account at any time."],
      ["Contact", "Questions about privacy? Write to hello@makeyourowncourse.com."],
    ],
  },
  terms: {
    title: "Terms & Conditions",
    sections: [
      ["Your account", "Keep your login details private. You are responsible for activity on your account."],
      ["Course access", "When you enroll, you get personal, non-transferable access to the course content."],
      ["Payments and refunds", "Prices are shown before checkout. You can request a refund within 7 days if you have watched less than 20% of a course."],
      ["Instructors", "Instructors own their content and must follow our content guidelines. We may remove courses that break them."],
      ["Changes", "We may update these terms. We'll let you know by email before important changes take effect."],
    ],
  },
};

function Legal({ type }) {
  const page = CONTENT[type];

  return (
    <div className="bg-[#f8f8f5] pb-16">
      <PageHero eyebrow="LEGAL" title={page.title} text="Last updated: October 2026" />
      <div className="mx-auto mt-10 max-w-3xl space-y-4 px-4">
        {page.sections.map(([heading, text], index) => (
          <section key={heading} className="rounded-2xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">
              {index + 1}. {heading}
            </h2>
            <p className="mt-2 leading-7 text-gray-600">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Legal;
