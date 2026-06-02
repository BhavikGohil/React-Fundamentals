import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";
import { loginUser } from "../store/auth/authThunk";
import { Formik } from "formik";
import { loginSchema } from "../schemas/loginSchema";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          Enterprise CRM
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Login with admin credentials
        </p>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const resault = loginSchema.safeParse(values);

            if (resault.success) {
              return {};
            }
            return resault.error.flatten().fieldErrors;
          }}
          onSubmit={(values) => {
            dispatch(loginUser(values));
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                  placeholder="admin@test.com"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-slate-900"
                  placeholder="Password@123"
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {loading ? "Login in.." : "Login"}
              </button>
            </form>
          )}
        </Formik>
        <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm text-slate-600">
          <p>Email: admin@test.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
