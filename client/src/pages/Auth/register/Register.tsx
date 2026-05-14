import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { validateRegister } from "@/utils/auth-validation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { RegisterRequest } from "@/types/auth.type";
import AuthHeader from "@/pages/Auth/components/AuthHeader";
import AuthCard from "@/pages/Auth/components/AuthCard";
import TextInput from "@/components/ui/TextInput";
import PasswordInput from "@/components/ui/PasswordInput";


interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const initialValues: RegisterRequest = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Register() {
const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<RegisterRequest>(initialValues);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [submitted, setSubmitted] = useState(false);
  
  const { register } = useAuth(); 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setIsLoading(true)

    const validationErrors = validateRegister(values);
    setErrors(validationErrors);
    const isFormValid = Object.keys(validationErrors).length === 0;

    if (!isFormValid) return;

    try {
      await register.mutateAsync(values, {
        onSuccess: () => {
          toast.success("Register successfully")
          setValues(initialValues)
          navigate('/login')
        },
        onError: () => {
          toast.error("Register failed")
        }
      })
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        serverError: error?.data?.message || "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!"
      }));
    } finally {
      setIsLoading(false)
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
                name="name"
                value={values.name}
                placeholder="John Doe"
                autoComplete="name"
                error={submitted ? errors.name : undefined}
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
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Create Account"
                )}

                <div className="absolute inset-0 bg-linear-to-r from-sky-400 via-cyan-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </form>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}