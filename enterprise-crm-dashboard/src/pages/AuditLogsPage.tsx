import { ClipboardList } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchAuditLogs } from "../store/auditLog/auditLogThunk";

const AuditLogsPage = () => {
  const dispatch = useAppDispatch();

  const { auditLogs, loading, error } = useAppSelector(
    (state) => state.auditLog
  );

  useEffect(() => {
    dispatch(fetchAuditLogs());
  }, [dispatch]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <ClipboardList size={24} />
          Audit Logs
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track important system actions and data changes
        </p>
      </div>

      {loading && (
        <p className="text-slate-600 dark:text-slate-300">
          Loading audit logs...
        </p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-900">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Entity</th>
                <th className="px-4 py-3">Entity ID</th>
                <th className="px-4 py-3">Created By</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>

            <tbody>
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {log.entity}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {log.entityId}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {log.createdBy}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {auditLogs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No audit logs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditLogsPage;