interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""}`}>
      <h2 className="font-display text-2xl md:text-4xl font-semibold text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-muted text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
