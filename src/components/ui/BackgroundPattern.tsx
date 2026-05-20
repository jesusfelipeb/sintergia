/* ─────────────────────────────────────────────────────────────
 * BackgroundPattern — patrón sutil de fondo (dots / grid / lines)
 * con mask radial para que decaiga al borde y no compita visualmente
 * con el contenido. 100% decoración: sin state, server-friendly.
 *
 * Variantes:
 *  - "dots"        20px · puntos cerrados, sensación tech-paper
 *  - "dots-sparse" 40px · puntos esparcidos, ambiente
 *  - "grid"        48px · líneas cruzadas, esquema/blueprint
 *  - "lines"       32px · líneas horizontales, editorial newspaper
 * ──────────────────────────────────────────────────────────── */

type Variant = "dots" | "dots-sparse" | "grid" | "lines";

interface Props {
  variant?: Variant;
  /** Intensidad 0..1 (multiplica la opacidad del color). Default 1. */
  intensity?: number;
  /** Modo de máscara: "radial" (default, decae centro) o "top" (decae arriba) o "none". */
  mask?: "radial" | "top" | "none";
}

const lineColor = (a: number) => `rgba(248,250,252,${a})`;

export default function BackgroundPattern({
  variant = "dots",
  intensity = 1,
  mask = "radial",
}: Props) {
  const a = (base: number) => base * intensity;

  const styles: Record<Variant, React.CSSProperties> = {
    dots: {
      backgroundImage: `radial-gradient(${lineColor(a(0.07))} 1px, transparent 1px)`,
      backgroundSize: "20px 20px",
    },
    "dots-sparse": {
      backgroundImage: `radial-gradient(${lineColor(a(0.09))} 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
    },
    grid: {
      backgroundImage: [
        `linear-gradient(${lineColor(a(0.045))} 1px, transparent 1px)`,
        `linear-gradient(90deg, ${lineColor(a(0.045))} 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: "48px 48px",
    },
    lines: {
      backgroundImage: `linear-gradient(${lineColor(a(0.05))} 1px, transparent 1px)`,
      backgroundSize: "100% 32px",
    },
  };

  const maskStyles: Record<NonNullable<Props["mask"]>, React.CSSProperties> = {
    radial: {
      maskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
      WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 78%)",
    },
    top: {
      maskImage: "linear-gradient(to bottom, black 0%, transparent 90%)",
      WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 90%)",
    },
    none: {},
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ ...styles[variant], ...maskStyles[mask] }}
    />
  );
}
