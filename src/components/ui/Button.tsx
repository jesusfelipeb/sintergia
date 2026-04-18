import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "whatsapp";
type Size = "default" | "lg";

interface ButtonProps extends ComponentProps<"a"> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-dark shadow-xl shadow-accent/20 hover:scale-105",
  ghost:
    "border border-white/20 text-white hover:bg-white hover:text-bg backdrop-blur-sm bg-white/5",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1DA851]",
};

const sizes: Record<Size, string> = {
  default: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  variant = "primary",
  size = "default",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
