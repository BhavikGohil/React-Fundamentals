import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/reduxHooks";
import { createAuditLog } from "../store/auditLog/auditLogThunk";
import { addCustomer } from "../store/customer/customerThunk";
import type { CustomerFormValues } from "../types/customerTypes";
import CustomerForm from "../components/Forms/CustomerForm";

const AddCustomerPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initialValues: CustomerFormValues = {
    name: "",
    email: "",
    phone: "",
    status: "active",
    revenue: 0,
  };

  const handleSubmit = async (values: CustomerFormValues) => {
    const customer = await dispatch(addCustomer(values)).unwrap();

    dispatch(
      createAuditLog({
        action: "CREATE_CUSTOMER",
        entity: "Customer",
        entityId: customer.id,
      })
    );

    navigate("/customers");
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Add Customer
      </h1>

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