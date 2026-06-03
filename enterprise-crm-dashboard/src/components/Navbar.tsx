import {
  Archive,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../store/auth/authSlice";
import { toggleTheme } from "../store/theme/themeSlice";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
      isActive
        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900 dark:text-white">
          Enterprise CRM
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            <LayoutDashboard size={18} />
            <span className="hidden lg:inline">Dashboard</span>
          </NavLink>

          <NavLink to="/customers" className={navLinkClass}>
            <Users size={18} />
            <span className="hidden lg:inline">Customers</span>
          </NavLink>

          <NavLink to="/customers/archived" className={navLinkClass}>
            <Archive size={18} />
            <span className="hidden lg:inline">Archived</span>
          </NavLink>

          <NavLink to="/audit-logs" className={navLinkClass}>
            <ClipboardList size={18} />
            <span className="hidden lg:inline">Audit</span>
          </NavLink>

          <NotificationBell />

          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-md border border-slate-300 p-2 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <span className="hidden text-sm text-slate-500 dark:text-slate-400 xl:inline">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          >
            <LogOut size={18} />
            <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;