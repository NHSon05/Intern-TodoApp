import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthCard from "../../../components/ui/AuthCard";
import AuthHeader from "../../../components/ui/AuthHeader";
import PasswordInput from "../../../components/ui/PasswordInput";
import TextInput from "../../../components/ui/TextInput";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialValues: RegisterForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState<RegisterForm>(initialValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (!values.username.trim()) {
      nextErrors.username = "Full name is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Password is required.";
    } else if (values.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    if (!values.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
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
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <AuthHeader currentPage="register" />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <AuthCard
            title="Create an account"
            subtitle="Start managing your tasks with TaskFlow"
            icon={
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/15 ring-1 ring-sky-400/20">
                <span className="text-xl font-bold text-sky-300">+</span>
              </div>
            }
            footer={
              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-sky-400 transition hover:text-sky-300"
                >
                  Sign in
                </Link>
              </p>
            }
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <TextInput
                label="Full Name"
                name="username"
                value={values.username}
                placeholder="John Doe"
                autoComplete="name"
                error={submitted ? errors.username : undefined}
                onChange={handleChange}
              />

              <TextInput
                label="Email Address"
                name="email"
                type="email"
                value={values.email}
                placeholder="you@example.com"
                autoComplete="email"
                error={submitted ? errors.email : undefined}
                onChange={handleChange}
              />

              <PasswordInput
                label="Password"
                name="password"
                value={values.password}
                placeholder="Enter your password"
                autoComplete="new-password"
                error={submitted ? errors.password : undefined}
                onChange={handleChange}
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
                error={submitted ? errors.confirmPassword : undefined}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-2xl bg-sky-500 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:shadow-[0_0_30px_rgba(14,165,233,0.35)] focus:outline-none focus:ring-2 focus:ring-sky-400/40"
              >
                <span className="relative z-10">Create Account</span>

                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
