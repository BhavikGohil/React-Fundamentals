import {
  Archive,
  Bell,
  CheckCircle2,
  CircleDollarSign,
  Clock,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import StatCard from "../components/StatCard";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  fetchDashboardRecentActivities,
  fetchDashboardStats,
} from "../store/dashboard/dashboardThunk";

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { stats, recentActivities, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardStats());
    dispatch(fetchDashboardRecentActivities());
  }, [dispatch]);

  const formattedRevenue = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(stats?.revenue || 0);
  }, [stats?.revenue]);

  const taskSummary = useMemo(() => {
    if (!stats) return [];

    return [
      {
        label: "Unread notifications",
        value: stats.unreadNotifications,
      },
      {
        label: "Archived customers",
        value: stats.archivedCustomers,
      },
      {
        label: "Customers needing follow-up",
        value: stats.inactiveCustomers,
      },
    ];
  }, [stats]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard Analytics
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Revenue, customer health, recent activity, and operational tasks
        </p>
      </div>

      {loading && (
        <p className="text-slate-600 dark:text-slate-300">
          Loading dashboard...
        </p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Revenue"
              value={formattedRevenue}
              icon={CircleDollarSign}
              tone="green"
            />
            <StatCard
              title="Customer Growth"
              value={`+${stats.customerGrowth}`}
              icon={TrendingUp}
              tone="blue"
            />
            <StatCard
              title="Total Customers"
              value={stats.totalCustomers}
              icon={Users}
              tone="slate"
            />
            <StatCard
              title="Unread Notifications"
              value={stats.unreadNotifications}
              icon={Bell}
              tone="amber"
            />
            <StatCard
              title="Active Customers"
              value={stats.activeCustomers}
              icon={CheckCircle2}
              tone="green"
            />
            <StatCard
              title="Inactive Customers"
              value={stats.inactiveCustomers}
              icon={XCircle}
              tone="red"
            />
            <StatCard
              title="Archived Customers"
              value={stats.archivedCustomers}
              icon={Archive}
              tone="purple"
            />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                <Clock size={20} />
                Recent Activities
              </h2>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="border-l-2 border-slate-300 pl-4 dark:border-slate-700"
                  >
                    <p className="font-medium text-slate-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm capitalize text-slate-500 dark:text-slate-400">
                      {activity.type} by {activity.createdBy}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}

                {recentActivities.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No recent activities found
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
                Task Summary
              </h2>

              <div className="space-y-3">
                {taskSummary.map((task) => (
                  <div
                    key={task.label}
                    className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3 dark:bg-slate-950"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      {task.label}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {task.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardPage;