import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./PanelSidebar";

// Closes a dropdown when the user clicks outside of it.
function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    const handle = (event) => {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [onOutside]);
  return ref;
}

const dropdownClass =
  "absolute right-0 top-12 z-50 animate-scale-in origin-top-right rounded-2xl border border-gray-200 bg-white shadow-xl";

function PanelSearch({ pages }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));

  const results = query.trim()
    ? pages.filter((page) => page.name.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const go = (path) => {
    navigate(path);
    setQuery("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus-within:border-primary focus-within:bg-white">
        <i className="ri-search-line text-gray-400"></i>
        <input
          type="search"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => event.key === "Enter" && results[0] && go(results[0].path)}
          placeholder="Search pages..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400 md:w-44 lg:w-56"
        />
      </div>

      {open && query.trim() && (
        <div className={`${dropdownClass} left-0 right-auto w-full min-w-64 p-2`}>
          {results.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-gray-400">No pages match “{query}”.</p>
          ) : (
            results.map((page) => (
              <button
                key={page.path}
                type="button"
                onClick={() => go(page.path)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm hover:bg-gray-50"
              >
                <i className={`${page.icon} text-lg text-primary`}></i>
                {page.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function PanelTopbar({ panelName, user, pages, notifications, setNotifications, profilePath, settingsPath, onMenuClick, onLogout }) {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileSearch, setMobileSearch] = useState(false);
  const notifyRef = useClickOutside(() => openMenu === "notify" && setOpenMenu(null));
  const profileRef = useClickOutside(() => openMenu === "profile" && setOpenMenu(null));

  const unread = notifications.filter((item) => !item.read).length;
  const toggle = (name) => setOpenMenu((current) => (current === name ? null : name));

  const openNotification = (item) => {
    setNotifications((prev) => prev.map((n) => (n.id === item.id ? { ...n, read: true } : n)));
    setOpenMenu(null);
    if (item.path) navigate(item.path);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="flex h-[76px] items-center justify-between gap-3 px-5 md:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 lg:hidden"
          >
            <i className="ri-menu-line text-xl text-[#10131d]"></i>
          </button>
          <div className="min-w-0">
            <p className="text-xs text-gray-400">{panelName}</p>
            <h2 className="truncate text-base font-semibold text-[#10131d] md:text-lg">
              Welcome back, {user.name.split(" ")[0]} 👋
            </h2>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PanelSearch pages={pages} />
          </div>

          <button
            type="button"
            onClick={() => setMobileSearch((value) => !value)}
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-50 md:hidden"
          >
            <i className="ri-search-line text-gray-500"></i>
          </button>

          {/* Notifications */}
          <div ref={notifyRef} className="relative">
            <button
              type="button"
              onClick={() => toggle("notify")}
              aria-label="Notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:bg-gray-50"
            >
              <i className="ri-notification-3-line text-gray-600"></i>
              {unread > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#168ee5] px-1 text-[10px] font-bold text-white">
                  {unread}
                </span>
              )}
            </button>

            {openMenu === "notify" && (
              <div className={`${dropdownClass} w-[min(22rem,calc(100vw-2rem))]`}>
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                  <p className="text-sm font-semibold">Notifications</p>
                  <button
                    type="button"
                    onClick={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                    className="text-xs font-medium text-primary hover:underline disabled:text-gray-300 disabled:no-underline"
                    disabled={unread === 0}
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {notifications.length === 0 && (
                    <p className="px-3 py-6 text-center text-sm text-gray-400">You're all caught up.</p>
                  )}
                  {notifications.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => openNotification(item)}
                      className="flex w-full gap-3 rounded-xl px-3 py-3 text-left hover:bg-gray-50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <i className={`${item.icon} text-primary`}></i>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-sm ${item.read ? "text-gray-500" : "font-semibold text-[#10131d]"}`}>
                          {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-gray-400">{item.time}</span>
                      </span>
                      {!item.read && <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div ref={profileRef} className="relative">
            <button type="button" onClick={() => toggle("profile")} aria-label="Account menu" className="rounded-full">
              <Avatar user={user} size="h-10 w-10" />
            </button>

            {openMenu === "profile" && (
              <div className={`${dropdownClass} w-60 p-2`}>
                <div className="border-b border-gray-100 px-3 pb-3 pt-2">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-gray-400">{user.email}</p>
                </div>
                {[
                  { label: "My profile", icon: "ri-user-line", to: profilePath },
                  { label: "Settings", icon: "ri-settings-3-line", to: settingsPath },
                  { label: "Visit website", icon: "ri-global-line", to: "/" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={() => setOpenMenu(null)}
                    className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#10131d]"
                  >
                    <i className={link.icon}></i>
                    {link.label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={onLogout}
                  className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
                >
                  <i className="ri-logout-box-r-line"></i>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileSearch && (
        <div className="animate-fade-in border-t border-gray-100 px-5 py-3 md:hidden">
          <PanelSearch pages={pages} />
        </div>
      )}
    </header>
  );
}

export default PanelTopbar;
