import { Formik } from "formik";
import type { CustomerFormValues } from "../../types/customerTypes";
import { customerSchema } from "../../schemas/customerSchema";
import { Save } from "lucide-react";

interface CustomerFormProps {
  initialValues: CustomerFormValues;
  buttonText: string;
  onSubmit: (values: CustomerFormValues) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white";

const labelClass =
  "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

const CustomerForm = ({
  initialValues,
  buttonText,
  onSubmit,
}: CustomerFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validate={(values) => {
        const result = customerSchema.safeParse(values);

        if (result.success) {
          return {};
        }

        return result.error.flatten().fieldErrors;
      }}
      onSubmit={(values) => {
        onSubmit({
          ...values,
          revenue: Number(values.revenue),
        });
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
          <div>
            <label className={labelClass}>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className={labelClass}>Revenue</label>
            <input
              type="number"
              name="revenue"
              value={values.revenue}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.revenue && errors.revenue && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.revenue}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="status"
              value={values.status}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {touched.status && errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status}</p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 font-medium text-white dark:bg-white dark:text-slate-900"
          >
            <Save size={18} />
            {buttonText}
          </button>
        </form>
      )}
    </Formik>
  );
};

export default CustomerForm;
