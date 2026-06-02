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
  const activeCustomers = customers.filter(
    (customer) => customer.status === "active"
  ).length;
  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "inactive"
  ).length;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h1>

      {loading ? (
        <p className="text-slate-600">Loading dashboard...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {totalCustomers}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Active Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {activeCustomers}
            </h2>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Inactive Customers</p>
            <h2 className="mt-2 text-3xl font-bold text-red-600">
              {inactiveCustomers}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;