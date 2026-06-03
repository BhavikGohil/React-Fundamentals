import { Formik } from "formik";
import { Plus } from "lucide-react";
import { activitySchema } from "../../schemas/activitySchema";
import type { ActivityFormValues } from "../../types/activityTypes";

interface ActivityFormProps {
  onSubmit: (values: ActivityFormValues) => void;
}

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white";

const labelClass =
  "mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300";

const ActivityForm = ({ onSubmit }: ActivityFormProps) => {
  const initialValues: ActivityFormValues = {
    type: "call",
    title: "",
    description: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const result = activitySchema.safeParse(values);

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
          className="space-y-4 rounded-lg border border-slate-200 p-4 dark:border-slate-800"
        >
          <div>
            <label className={labelClass}>Activity Type</label>
            <select
              name="type"
              value={values.type}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="call">Call</option>
              <option value="meeting">Meeting</option>
              <option value="email">Email</option>
              <option value="note">Note</option>
            </select>
            {touched.type && errors.type && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.type}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Title</label>
            <input
              name="title"
              value={values.title}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.title && errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              rows={3}
              value={values.description}
              onChange={handleChange}
              className={inputClass}
            />
            {touched.description && errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          >
            <Plus size={18} />
            Add Activity
          </button>
        </form>
      )}
    </Formik>
  );
};

export default ActivityForm;