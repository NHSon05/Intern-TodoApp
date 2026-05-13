import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../../../components/ui/AuthCard";
import AuthHeader from "../../../components/ui/AuthHeader";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";

interface LoginForm {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const defaultValues: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const [values, setValues] = useState<LoginForm>(defaultValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: undefined }));
  };

  const validate = () => {
    const nextErrors: LoginErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("accessToken", "taskflow-demo-token");
      navigate("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <AuthHeader currentPage="login" />

      <div className="absolute inset-x-0 top-0 h-72 bg-black" />
      <main className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20 sm:px-8 sm:py-24">
        <div className="w-full max-w-[420px] mx-auto">
          <AuthCard
            title="Welcome back"
            subtitle="Sign in to your TaskFlow account"
            icon={<span className="text-2xl font-semibold">✓</span>}
            footer={
              <p className="text-sm text-slate-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-sky-300 transition hover:text-sky-200"
                >
                  Sign up
                </Link>
              </p>
            }
          >
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <TextInput
                label="Email address"
                name="email"
                type="email"
                value={values.email}
                placeholder="Enter your email"
                autoComplete="email"
                error={submitted ? errors.email : undefined}
                onChange={handleChange}
              />

              <PasswordInput
                label="Password"
                name="password"
                value={values.password}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={submitted ? errors.password : undefined}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
              >
                Sign In
              </button>
            </form>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
