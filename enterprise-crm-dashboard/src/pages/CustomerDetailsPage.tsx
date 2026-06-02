import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { clearSelectedCustomer } from "../store/customer/customerSlice";
import { fetchCustomerById } from "../store/customer/customerThunk";

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);
  
  const dispatch = useAppDispatch();

  const { selectedCustomer } = useAppSelector((state) => state.customer);

 useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
    }

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [dispatch, id]);

 

  if (!selectedCustomer) {
    return <p className="text-slate-600">Loading customer details...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">
          Customer Details
        </h1>

        <Link to="/customers" className="text-sm font-medium text-slate-600">
          Back to Customers
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {selectedCustomer.name}
            </h2>
            <p className="text-sm text-slate-500">{selectedCustomer.email}</p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              selectedCustomer.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {selectedCustomer.status}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">Customer ID</p>
            <p className="font-medium text-slate-900">{selectedCustomer.id}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Phone</p>
            <p className="font-medium text-slate-900">
              {selectedCustomer.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Email</p>
            <p className="font-medium text-slate-900">
              {selectedCustomer.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="font-medium capitalize text-slate-900">
              {selectedCustomer.status}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            to={`/customers/${selectedCustomer.id}/edit`}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Edit Customer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
