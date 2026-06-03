import { Formik } from "formik";
import { Plus } from "lucide-react";
import type { ContactFormValues } from "../../types/contactTypes";
import { contactSchema } from "../../schemas/contactSchema";

interface ContactFormProps {
  onSubmit: (values: ContactFormValues) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white";

const labelClass =
  "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const initialValues: ContactFormValues = {
    name: "",
    email: "",
    phone: "",
    type: "primary",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const result = contactSchema.safeParse(values);

        if (result.success) {
          return {};
        }

        return result.error.flatten().fieldErrors;
      }}
      onSubmit={(values, helpers) => {
        onSubmit(values);
        helpers.resetForm();
      }}
    >
      {({ values, errors, touched, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-lg border border-slate-200 p-4 dark:border-slate-800 md:grid-cols-2"
        >
          <div>
            <label className={labelClass}>Contact Name</label>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contact Email</label>
            <input
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contact Phone</label>
            <input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Contact Type</label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="primary">Primary</option>
              <option value="billing">Billing</option>
              <option value="technical">Technical</option>
            </select>
            {touched.type && errors.type && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.type}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
            >
              <Plus size={18} />
              Add Contact
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ContactForm;