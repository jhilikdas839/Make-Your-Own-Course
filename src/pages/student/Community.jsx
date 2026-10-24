import { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import SafeImage from "../../components/common/SafeImage";
import { useToast } from "../../components/common/toastContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { groups, members } from "../../data/studentData";

const guidelines = [
  "Be respectful to other learners.",
  "Share useful and relevant information.",
  "Avoid spam and promotional content.",
  "Help others whenever you can.",
  "Don't share answers to graded assessments.",
  "Report anything that breaks these rules.",
];

const formatCount = (n) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : n);

function Community() {
  const toast = useToast();
  const [joined, setJoined] = useLocalStorage("myoc_joined_groups", [1]);
  const [following, setFollowing] = useLocalStorage("myoc_following", []);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  const toggleGroup = (group) => {
    const isMember = joined.includes(group.id);
    setJoined((prev) => (isMember ? prev.filter((id) => id !== group.id) : [...prev, group.id]));
    toast(isMember ? `You left ${group.name}.` : `Welcome to ${group.name}!`, isMember ? "info" : "success");
  };

  const toggleFollow = (member) => {
    const isFollowing = following.includes(member.id);
    setFollowing((prev) => (isFollowing ? prev.filter((id) => id !== member.id) : [...prev, member.id]));
  };

  const visibleGroups = showAllGroups ? groups : groups.slice(0, 3);

  return (
    <>
      <PageHeader eyebrow="Student Network" title="Community" description="Connect with fellow learners, join groups and grow together." />

      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Community Members" value="5.2K" icon="ri-group-line" />
        <StatCard label="Active Today" value="846" icon="ri-pulse-line" tone="green" />
        <StatCard label="Groups Joined" value={joined.length} icon="ri-team-line" tone="blue" />
        <StatCard label="Following" value={following.length} icon="ri-user-follow-line" tone="purple" />
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Popular Communities</h2>
          <button type="button" onClick={() => setShowAllGroups((v) => !v)} className="text-sm font-medium hover:text-primary">
            {showAllGroups ? "Show less" : `View all (${groups.length})`}
          </button>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleGroups.map((group) => {
            const isMember = joined.includes(group.id);
            return (
              <div key={group.id} className="animate-fade-in rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <i className={`${group.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{group.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{group.description}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatCount(group.members + (isMember ? 1 : 0))} members</span>
                  <Button size="sm" variant={isMember ? "outline" : "dark"} icon={isMember ? "ri-check-line" : "ri-add-line"} onClick={() => toggleGroup(group)}>
                    {isMember ? "Joined" : "Join"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-xl font-semibold">Active Members</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {members.map((member) => {
              const isFollowing = following.includes(member.id);
              return (
                <div key={member.id} className="flex items-center gap-3 rounded-2xl border border-gray-100 p-3">
                  <div className="relative">
                    <SafeImage src={member.image} alt={member.name} icon="ri-user-line" className="h-12 w-12 rounded-full object-cover" />
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{member.name}</p>
                    <p className="truncate text-xs text-gray-400">{member.role}</p>
                  </div>
                  <Button size="sm" variant={isFollowing ? "outline" : "primary"} onClick={() => toggleFollow(member)}>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl bg-[#10131d] p-6 text-white">
          <h2 className="text-xl font-semibold">Community Guidelines</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {guidelines.slice(0, 4).map((rule) => (
              <li key={rule} className="flex gap-2">
                <i className="ri-checkbox-circle-line text-primary"></i>
                {rule}
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => setRulesOpen(true)} className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-[#10131d] hover:bg-primary hover:text-white">
            Read Full Guidelines
          </button>
        </div>
      </section>

      <section className="mt-8 flex flex-col justify-between gap-4 rounded-3xl bg-primary p-7 md:flex-row md:items-center">
        <div>
          <h3 className="text-xl font-semibold">Your next great connection could be here.</h3>
          <p className="mt-1 text-sm text-[#10131d]/60">Ask a question or help someone today.</p>
        </div>
        <Link to="/student/discussions" className="w-fit rounded-xl bg-white px-5 py-3 text-sm font-medium hover:bg-[#10131d] hover:text-white">
          Open Discussions
        </Link>
      </section>

      <Modal open={rulesOpen} onClose={() => setRulesOpen(false)} title="Community Guidelines">
        <ol className="space-y-3 text-sm text-gray-600">
          {guidelines.map((rule, index) => (
            <li key={rule} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{index + 1}</span>
              {rule}
            </li>
          ))}
        </ol>
      </Modal>
    </>
  );
}

export default Community;
