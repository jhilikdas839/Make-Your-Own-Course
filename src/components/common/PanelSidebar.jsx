import { Link, NavLink } from "react-router-dom";
import { getInitials } from "../../utils/auth";

function Avatar({ user, size = "h-11 w-11" }) {
  if (user.avatar) {
    return <img src={user.avatar} alt={user.name} className={`${size} shrink-0 rounded-full object-cover`} />;
  }
  return (
    <div className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#10131d] text-sm font-bold text-white`}>
      {getInitials(user.name)}
    </div>
  );
}

function PanelSidebar({ menu, homePath, roleLabel, user, onNavigate, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-gray-100 px-7">
        <Link to={homePath} onClick={onNavigate} className="text-[28px] font-bold tracking-tight text-[#10131d]">
          MY<span className="text-[#168ee5]">OC</span>
        </Link>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">{roleLabel}</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
        {menu.map((group) => (
          <div key={group.title}>
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9aa3b2]">{group.title}</p>

            <div className="space-y-1.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-4 rounded-[18px] px-3 py-3 text-[15px] transition-all duration-200 ${
                      isActive
                        ? "bg-[#168ee5] font-semibold text-[#10131d] shadow-sm shadow-primary/20"
                        : "text-[#687386] hover:bg-gray-50 hover:text-[#10131d]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <i
                        className={`${item.icon} text-[22px] transition-transform duration-200 group-hover:scale-110 ${
                          isActive ? "text-[#10131d]" : "text-[#737d8e]"
                        }`}
                      ></i>
                      <span className="flex-1 truncate">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            isActive ? "bg-white/40 text-[#10131d]" : "bg-gray-100 text-[#9aa3b2]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="shrink-0 border-t border-gray-100 bg-white p-5">
        <div className="flex items-center gap-4">
          <Avatar user={user} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[16px] font-semibold text-[#10131d]">{user.name}</p>
            <p className="mt-0.5 truncate text-sm text-[#9aa3b2]">{roleLabel}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Log out"
            aria-label="Log out"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <i className="ri-logout-box-r-line text-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export { Avatar };
export default PanelSidebar;
