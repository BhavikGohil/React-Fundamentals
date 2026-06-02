import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import {
  fetchCustomerById,
  updateCustomer,
} from "../store/customer/customerThunk";
import type { CustomerFormValues } from "../types/customerTypes";
import CustomerForm from "../components/CustomerForm";
import { clearSelectedCustomer } from "../store/customer/customerSlice";

const EditCustomerPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    return <p className="text-slate-600">Loading customer...</p>;
  }

  const initialValues: CustomerFormValues = {
    name: selectedCustomer.name,
    email: selectedCustomer.email,
    phone: selectedCustomer.phone,
    status: selectedCustomer.status,
  };
  const handleSubmit = async (values: CustomerFormValues) => {
    await dispatch(
      updateCustomer({
        ...values,
        id: selectedCustomer.id,
      }),
    );

    navigate("/customers");
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Edit Customer</h1>

        <Link to="/customers" className="text-sm font-medium text-slate-600">
          Back to Customers
        </Link>
      </div>
      <div className="rounded-lg bg-white p-6 shadow">
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
