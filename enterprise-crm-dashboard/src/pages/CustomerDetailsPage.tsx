import {
  Mail,
  Phone,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ActivityForm from "../components/Forms/ActivityForm";
import ContactForm from "../components/Forms/ContactForm";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addActivity, fetchActivitiesByCustomerId } from "../store/activity/activityThunk";
import { clearSelectedCustomer } from "../store/customer/customerSlice";
import { fetchCustomerById } from "../store/customer/customerThunk";
import {
  addContact,
  deleteContact,
  fetchContactsByCustomerId,
} from "../store/contact/contactThunk";
import type { ActivityFormValues } from "../types/activityTypes";
import type { ContactFormValues } from "../types/contactTypes";

const CustomerDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { selectedCustomer, loading } = useAppSelector((state) => state.customer);
  const { contacts } = useAppSelector((state) => state.contact);
  const { activities } = useAppSelector((state) => state.activity);

  useEffect(() => {
    if (id) {
      dispatch(fetchCustomerById(id));
      dispatch(fetchContactsByCustomerId(id));
      dispatch(fetchActivitiesByCustomerId(id));
    }

    return () => {
      dispatch(clearSelectedCustomer());
    };
  }, [dispatch, id]);

  if (loading || !selectedCustomer || !id) {
    return <p className="text-slate-600 dark:text-slate-300">Loading customer details...</p>;
  }

  const handleAddContact = (values: ContactFormValues) => {
    dispatch(addContact({ customerId: id, values }));
  };

  const handleAddActivity = (values: ActivityFormValues) => {
    dispatch(addActivity({ customerId: id, values }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Customer Details
        </h1>
        <Link to="/customers" className="text-sm font-medium text-slate-600 dark:text-slate-300">
          Back to Customers
        </Link>
      </div>

      <section className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {selectedCustomer.name}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {selectedCustomer.email}
            </p>
          </div>

          <Link
            to={`/customers/${selectedCustomer.id}/edit`}
            className="rounded-md bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white dark:bg-white dark:text-slate-900"
          >
            Edit Customer
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
            <p className="font-medium text-slate-900 dark:text-white">{selectedCustomer.phone}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Revenue</p>
            <p className="font-medium text-slate-900 dark:text-white">
              ₹{Number(selectedCustomer.revenue || 0).toLocaleString("en-IN")}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Updated Date</p>
            <p className="font-medium text-slate-900 dark:text-white">
              {new Date(selectedCustomer.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <UserRound size={20} />
          Contacts
        </h2>

        <ContactForm onSubmit={handleAddContact} />

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="rounded-lg border border-slate-200 p-4 dark:border-slate-800"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{contact.name}</p>
                  <p className="text-xs capitalize text-slate-500 dark:text-slate-400">
                    {contact.type} contact
                  </p>
                </div>

                <button onClick={() => dispatch(deleteContact(contact.id))}>
                  <Trash2 size={16} className="text-red-600 dark:text-red-400" />
                </button>
              </div>

              <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Mail size={15} />
                {contact.email}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <Phone size={15} />
                {contact.phone}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow dark:bg-slate-900">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
          <Plus size={20} />
          Activity Timeline
        </h2>

        <ActivityForm onSubmit={handleAddActivity} />

        <div className="mt-6 space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="border-l-2 border-slate-300 pl-4 dark:border-slate-700"
            >
              <p className="font-medium text-slate-900 dark:text-white">
                {activity.title}
              </p>
              <p className="text-sm capitalize text-slate-500 dark:text-slate-400">
                {activity.type} by {activity.createdBy}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {activity.description}
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

          {activities.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No activities found
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default CustomerDetailsPage;