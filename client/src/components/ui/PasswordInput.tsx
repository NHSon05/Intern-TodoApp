import type { ChangeEvent } from "react";

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  autoComplete,
  error,
  onChange,
}: PasswordInputProps) => {
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium text-slate-300">{label}</span>
      <input
        name={name}
        type="password"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={onChange}
        className="h-14 w-full rounded-full border border-slate-700/80 bg-white/5 px-5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition duration-200 ease-in-out focus:border-sky-400 focus:ring-2 focus:ring-sky-500/15"
      />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </label>
  );
};

export default PasswordInput;
