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

const defaultValues: RegisterForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
  const [values, setValues] = useState<RegisterForm>(defaultValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: undefined }));
  };

  const validate = () => {
    const nextErrors: RegisterErrors = {};

    if (!values.username.trim()) {
      nextErrors.username = "Username is required.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
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
    <div className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <AuthHeader currentPage="register" />

      <div className="absolute inset-x-0 top-0 h-72 bg-black" />
      <main className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20 sm:px-8 sm:py-24">
        <div className="w-full max-w-[420px] mx-auto">
          <AuthCard
            title="Create your account"
            subtitle="Join TaskFlow and start organizing your tasks"
            icon={<span className="text-2xl font-semibold">+</span>}
            footer={
              <p className="text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-sky-300 transition hover:text-sky-200"
                >
                  Sign in
                </Link>
              </p>
            }
          >
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <TextInput
                label="Full name"
                name="username"
                value={values.username}
                placeholder="Enter your full name"
                autoComplete="name"
                error={submitted ? errors.username : undefined}
                onChange={handleChange}
              />

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
                placeholder="Create a password"
                autoComplete="new-password"
                error={submitted ? errors.password : undefined}
                onChange={handleChange}
              />

              <PasswordInput
                label="Confirm password"
                name="confirmPassword"
                value={values.confirmPassword}
                placeholder="Confirm your password"
                autoComplete="new-password"
                error={submitted ? errors.confirmPassword : undefined}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-400"
              >
                Create Account
              </button>
            </form>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
