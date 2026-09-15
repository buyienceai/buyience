import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "lime" | "outline-gray" | "text";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-bold cursor-pointer transition-all duration-150 ease-out select-none active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-[#6E2CF4]/30 !no-underline hover:!no-underline";

  const variants = {
    primary:
      "bg-[#6E2CF4] !text-white shadow-[0_10px_26px_rgba(110,44,244,0.34)] hover:bg-[#5B21D8] hover:-translate-y-[1px] hover:shadow-[0_10px_26px_rgba(110,44,244,0.34)]",
    secondary:
      "bg-white !text-[#6E2CF4] border border-[#E7DEFB] hover:border-[#6E2CF4] hover:-translate-y-[1px]",
    ghost:
      "bg-white !text-[#6E2CF4] border border-[#E7DEFB] hover:border-[#6E2CF4] hover:-translate-y-[1px]",
    lime:
      "bg-[#D6FB4F] !text-[#1B1033] shadow-[0_10px_24px_-14px_rgba(214,251,79,0.5)] hover:bg-[#E2FF74] hover:-translate-y-[1px]",
    "outline-gray":
      "border border-slate-300 !text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-[1px]",
    text: "!text-slate-600 hover:!text-[#6E2CF4] bg-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-[13px] rounded-xl",
    md: "px-6 py-[12px] text-[15px] rounded-xl",
    lg: "px-7 py-[14px] text-[15.5px] rounded-xl",
  };

  const combinedClassName = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link prefetch={false}
        href={href}
        className={combinedClassName}
        onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props;

  return (
    <button type={type as "button" | "submit" | "reset"} className={combinedClassName} {...buttonProps}>
      {children}
    </button>
  );
}
