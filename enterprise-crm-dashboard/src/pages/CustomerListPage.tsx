import { Archive, Eye, Pencil, Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuditLog } from "../store/auditLog/auditLogThunk";
import {
  setSearchTerm,
  setStatusFilter,
} from "../store/customer/customerSlice";
import {
  archiveCustomer,
  fetchCustomers,
} from "../store/customer/customerThunk";
import { useDebounce } from "../hooks/useDebounce";
import { usePagination } from "../hooks/usePagination";
import { createNotification } from "../store/notification/notificationThunk";

const inputClass =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

const CustomerListPage = () => {
  const dispatch = useAppDispatch();

  const { customers, loading, error, searchTerm, statusFilter } =
    useAppSelector((state) => state.customer);

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((customer) => !customer.isArchived)
      .filter((customer) => {
        const matchesSearch =
          customer.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          customer.email.toLowerCase().includes(debouncedSearch.toLowerCase());

        const matchesStatus =
          statusFilter === "all" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
      });
  }, [customers, debouncedSearch, statusFilter]);

  const { currentPage, totalPages, paginatedItems, setCurrentPage } =
    usePagination(filteredCustomers, 5);

  const handleArchive = async (customerId: string) => {
    const customer = customers.find((item) => item.id === customerId);
    if (!customer) return;

    const archived = await dispatch(archiveCustomer(customer)).unwrap();

    dispatch(
      createAuditLog({
        action: "ARCHIVE_CUSTOMER",
        entity: "Customer",
        entityId: archived.id,
      }),
    );
    dispatch(
      createNotification({
        title: "Customer archived",
        message: `${archived.name} was archived.`,
        isRead: false,
      }),
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Customers
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage customer records, revenue, and account status
          </p>
        </div>

        <Link
          to="/customers/add"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
        >
          <Plus size={18} />
          Add Customer
        </Link>
      </div>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <input
          value={searchTerm}
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          placeholder="Search by name or email"
          className={inputClass}
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            dispatch(
              setStatusFilter(
                event.target.value as "all" | "active" | "inactive",
              ),
            )
          }
          className={inputClass}
        >
          <option value="all">All Customers</option>
          <option value="active">Active Customers</option>
          <option value="inactive">Inactive Customers</option>
        </select>
      </div>

      {loading && (
        <p className="text-slate-600 dark:text-slate-300">
          Loading customers...
        </p>
      )}

      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="overflow-x-auto rounded-lg bg-white shadow dark:bg-slate-900">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedItems.map((customer) => (
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
                      ₹{Number(customer.revenue || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/customers/${customer.id}`} title="View">
                          <Eye size={18} />
                        </Link>
                        <Link
                          to={`/customers/${customer.id}/edit`}
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleArchive(customer.id)}
                          title="Archive"
                        >
                          <Archive size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {paginatedItems.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-6 text-center text-slate-500 dark:text-slate-400"
                    >
                      No customers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default CustomerListPage;
