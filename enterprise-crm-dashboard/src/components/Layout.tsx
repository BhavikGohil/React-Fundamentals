import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;