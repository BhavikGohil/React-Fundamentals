import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  deleteCustomer,
  fetchCustomers,
} from "../store/customer/customerThunk";
import { Link } from "react-router-dom";
import {
  setSearchTerm,
  setStatusFilter,
} from "../store/customer/customerSlice";
import { Edit, Eye, Plus, Trash2 } from "lucide-react";

const CustomerListPage = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, error, searchTerm, statusFilter } =
    useAppSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const filteredCustomers = customers.filter((customer) => {
    const matchSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this customer?",
    );
    if (confirmed) {
      dispatch(deleteCustomer(id));
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500">
            Manage customer records and account status
          </p>
        </div>
        <Link
          to="/customers/add"
          className="rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white flex items-center gap-2"
        >
          <Plus size={18} />
          Add Customer
        </Link>
      </div>
      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          placeholder="Search by name or email"
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            dispatch(
              setStatusFilter(e.target.value as "all" | "active" | "inactive"),
            )
          }
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
        >
          <option value="all">All Customers</option>
          <option value="active">Active Customers</option>
          <option value="inactive">Inactive Customers</option>
        </select>
      </div>

      {loading && <p className="text-slate-600">Loading customers...</p>}
      {error && (
        <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {customer.name}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{customer.email}</td>
                  <td className="px-4 py-3 text-slate-600">{customer.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="space-x-2 px-4 py-3 text-right">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="text-sm font-medium text-slate-700"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/customers/${customer.id}/edit`}
                        className="text-sm font-medium text-blue-600"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="text-sm font-medium text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-slate-500"
                  >
                    No customers found
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
export default CustomerListPage;
