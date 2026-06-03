import { Bell, CheckCheck } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../store/notification/notificationThunk";

const NotificationsPage = () => {
  const dispatch = useAppDispatch();
  const { notifications, loading, error } = useAppSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Bell size={24} />
            Notifications
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
          </p>
        </div>

        <button
          onClick={() => dispatch(markAllNotificationsAsRead(notifications))}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-white dark:text-slate-900 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
        >
          <CheckCheck size={18} />
          Mark All Read
        </button>
      </div>

      {loading && (
        <p className="text-slate-600 dark:text-slate-300">
          Loading notifications...
        </p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => dispatch(markNotificationAsRead(notification))}
              className={`w-full rounded-lg border p-4 text-left shadow-sm transition ${
                notification.isRead
                  ? "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">
                    {notification.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    {notification.message}
                  </p>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>

                {!notification.isRead && (
                  <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                    New
                  </span>
                )}
              </div>
            </button>
          ))}

          {notifications.length === 0 && (
            <div className="rounded-lg bg-white p-6 text-center text-slate-500 shadow dark:bg-slate-900 dark:text-slate-400">
              No notifications found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;