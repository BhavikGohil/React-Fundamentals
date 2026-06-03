import { Formik } from "formik";
import { LogIn } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { loginSchema } from "../schemas/loginSchema";
import { loginUser } from "../store/auth/authThunk";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const from = (location.state as { from?: string } | null)?.from || "/";
      navigate(from, { replace: true });
    }
  }, [token, navigate, location.state]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Enterprise CRM
        </h1>
        <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">
          Login with admin credentials
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const result = loginSchema.safeParse(values);
            if (result.success) return {};

            const errors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
              errors[issue.path[0] as string] = issue.message;
            });
            return errors;
          }}
          onSubmit={(values) => {
            dispatch(loginUser(values));
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-4 py-2 font-medium text-white disabled:bg-slate-400 dark:bg-white dark:text-slate-900"
              >
                <LogIn size={18} />
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}
        </Formik>

        <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          <p>Email: admin@test.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;