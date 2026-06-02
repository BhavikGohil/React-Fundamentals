import { useEffect } from "react";
import { fetchCustomers } from "../store/customer/customerThunk";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "active").length;
  const inactiveCustomers = customers.filter((c) => c.status === "inactive").length;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Dashboard
      </h1>

      {loading ? (
        <p className="text-slate-600 dark:text-slate-300">Loading dashboard...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {totalCustomers}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
              {activeCustomers}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
            <p className="text-sm text-slate-500 dark:text-slate-400">Inactive Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
              {inactiveCustomers}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;