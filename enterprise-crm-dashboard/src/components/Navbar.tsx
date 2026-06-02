import {
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { logout } from "../store/auth/authSlice";
import { toggleTheme } from "../store/theme/themeSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.mode);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-slate-900 dark:text-white"
        >
          Enterprise CRM
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            to="/customers"
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            <Users size={18} />
            Customers
          </Link>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-md border border-slate-300 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <span className="hidden text-sm text-slate-500 dark:text-slate-400 md:inline">
            {user?.name}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;