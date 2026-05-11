import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

const AuthCard = ({
  title,
  subtitle,
  icon,
  children,
  footer,
}: AuthCardProps) => {
  return (
    <div className="relative w-full max-w-[420px] rounded-[28px] border border-white/10 bg-slate-950/95 p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)] backdrop-blur-3xl sm:p-10">
      <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sky-400/20 bg-sky-500 text-white shadow-[0_24px_60px_-24px_rgba(56,189,248,0.55)] h-16 w-16">
        {icon}
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.55em] text-sky-300/80 sm:text-sm">
          TaskFlow
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-[2.4rem]">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-slate-400 sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mt-10 space-y-4">{children}</div>

      {footer ? (
        <div className="mt-8 text-center text-sm text-slate-400">{footer}</div>
      ) : null}
    </div>
  );
};

export default AuthCard;
