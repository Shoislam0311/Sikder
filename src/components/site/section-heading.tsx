import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "center",
  light = false,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {kicker && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-gold/70" />
          <span
            className={cn(
              "text-xs font-sans tracking-luxe uppercase",
              light ? "text-gold-soft" : "text-gold"
            )}
          >
            {kicker}
          </span>
          <span className="h-px w-8 bg-gold/70" />
        </div>
      )}
      <h2
        className={cn(
          "font-serif font-medium leading-[1.1] text-balance",
          "text-4xl sm:text-5xl lg:text-[3.4rem]",
          light ? "text-ivory" : "text-emerald-deep"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 font-sans text-base leading-relaxed",
            light ? "text-ivory/75" : "text-ink-soft"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
