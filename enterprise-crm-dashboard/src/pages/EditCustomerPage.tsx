import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../components/Forms/CustomerForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { createAuditLog } from "../store/auditLog/auditLogThunk";
import { clearSelectedCustomer } from "../store/customer/customerSlice";
import {
  fetchCustomerById,
  updateCustomer,
} from "../store/customer/customerThunk";
import type { CustomerFormValues } from "../types/customerTypes";
import { createNotification } from "../store/notification/notificationThunk";

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedCustomer, loading } = useAppSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (id) dispatch(fetchCustomerById(id));

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [dispatch, id]);

  if (loading || !selectedCustomer) {
    return <p className="text-slate-600 dark:text-slate-300">Loading customer...</p>;
  }

  const initialValues: CustomerFormValues = {
    name: selectedCustomer.name,
    email: selectedCustomer.email,
    phone: selectedCustomer.phone,
    status: selectedCustomer.status,
    revenue: selectedCustomer.revenue,
  };

const handleSubmit = async (values: CustomerFormValues) => {
  const updated = await dispatch(
    updateCustomer({
      ...selectedCustomer,
      ...values,
    })
  ).unwrap();

  dispatch(
    createAuditLog({
      action: "UPDATE_CUSTOMER",
      entity: "Customer",
      entityId: updated.id,
    })
  );

  dispatch(
    createNotification({
      title: "Customer updated",
      message: `${updated.name} profile was updated.`,
      isRead: false,
    })
  );

  navigate("/customers");
};

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Edit Customer
        </h1>
        <Link to="/customers" className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Back to Customers
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
        <CustomerForm
          initialValues={initialValues}
          buttonText="Update Customer"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditCustomerPage;