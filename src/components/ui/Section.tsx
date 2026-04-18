import type { ComponentProps } from "react";

interface SectionProps extends ComponentProps<"section"> {
  alt?: boolean;
}

export default function Section({
  alt = false,
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={`px-4 py-16 md:py-24 ${alt ? "bg-bg-alt" : "bg-bg"} ${className}`}
      {...props}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
