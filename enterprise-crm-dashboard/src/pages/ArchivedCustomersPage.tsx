import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuditLog } from "../store/auditLog/auditLogThunk";
import {
  fetchCustomers,
  restoreCustomer,
} from "../store/customer/customerThunk";
import { createNotification } from "../store/notification/notificationThunk";

const ArchivedCustomersPage = () => {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const archivedCustomers = customers.filter((customer) => customer.isArchived);

  const handleRestore = async (customerId: string) => {
    const customer = customers.find((item) => item.id === customerId);
    if (!customer) return;

    const restored = await dispatch(restoreCustomer(customer)).unwrap();

    dispatch(
      createAuditLog({
        action: "RESTORE_CUSTOMER",
        entity: "Customer",
        entityId: restored.id,
      }),
    );
    dispatch(
      createNotification({
        title: "Customer restored",
        message: `${restored.name} was restored.`,
        isRead: false,
      }),
    );
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Archived Customers
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Restore customers that were archived from active records
        </p>
      </div>

      {loading ? (
        <p className="text-slate-600 dark:text-slate-300">
          Loading archived customers...
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-900">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Updated By</th>
                <th className="px-4 py-3">Updated Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {archivedCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-t border-slate-200 dark:border-slate-800"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {customer.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {customer.email}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {customer.updatedBy}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {new Date(customer.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRestore(customer.id)}
                      className="inline-flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
                    >
                      <RotateCcw size={18} />
                      Restore
                    </button>
                  </td>
                </tr>
              ))}

              {archivedCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No archived customers found
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

export default ArchivedCustomersPage;
