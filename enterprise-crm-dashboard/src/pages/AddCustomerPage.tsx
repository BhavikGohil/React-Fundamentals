import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import type { CustomerFormValues } from "../types/customerTypes";
import { addCustomer } from "../store/customer/customerThunk";
import CustomerForm from "../components/CustomerForm";

const AddCustomerPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: CustomerFormValues = {
    name: "",
    email: "",
    phone: "",
    status: "active",
  };
  const handleSubmit = async (values: CustomerFormValues) => {
    await dispatch(addCustomer(values));
    navigate("/customers");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">Add Customer</h1>
      <div className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
        <CustomerForm
          initialValues={initialValues}
          buttonText="Add Customer"
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
export default AddCustomerPage;
