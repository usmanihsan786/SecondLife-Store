import type { CategoryId } from "@/data/options";

export type PlaceholderKind = "bed" | "daybed" | "sofa" | "room";

export function placeholderKind(category?: CategoryId): PlaceholderKind {
  if (category === "daybeds") return "daybed";
  if (category === "sofa-beds") return "sofa";
  return "bed";
}

const drawings: Record<PlaceholderKind, React.ReactNode> = {
  bed: (
    <>
      <rect x="44" y="52" width="152" height="40" rx="6" />
      <path d="M36 128V92a8 8 0 0 1 8-8h152a8 8 0 0 1 8 8v36" />
      <path d="M36 112h168" />
      <rect x="58" y="72" width="44" height="14" rx="6" />
      <rect x="138" y="72" width="44" height="14" rx="6" />
      <path d="M44 128v8M196 128v8" />
    </>
  ),
  daybed: (
    <>
      <path d="M40 132V58a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v28h136V58a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v74" />
      <path d="M52 64h136" />
      <rect x="52" y="86" width="136" height="20" rx="4" />
      <path d="M52 118h136M40 132h160" />
      <rect x="66" y="70" width="34" height="14" rx="6" />
      <rect x="140" y="70" width="34" height="14" rx="6" />
    </>
  ),
  sofa: (
    <>
      <path d="M48 96V66a10 10 0 0 1 10-10h86a10 10 0 0 1 10 10v30" />
      <path d="M154 96V70h28a10 10 0 0 1 10 10v16" />
      <rect x="32" y="88" width="24" height="32" rx="8" />
      <path d="M56 98h136a10 10 0 0 1 10 10v12H56" />
      <path d="M100 98V60" />
      <path d="M40 120v12M196 120v12" />
    </>
  ),
  room: (
    <>
      <path d="M20 132h200" />
      <rect x="150" y="30" width="44" height="56" rx="3" />
      <path d="M172 30v56M150 58h44" />
      <rect x="54" y="74" width="100" height="30" rx="5" />
      <path d="M46 132v-36a6 6 0 0 1 6-6h104a6 6 0 0 1 6 6v36M46 116h116" />
      <rect x="64" y="80" width="30" height="12" rx="5" />
      <rect x="114" y="80" width="30" height="12" rx="5" />
      <path d="M198 132V104M190 104h16l-3-12h-10z" />
    </>
  ),
};

type Props = {
  kind?: PlaceholderKind;
  label?: string;
  className?: string;
};

/** Neutral stand-in used wherever a photo has not been added yet. */
export function ImagePlaceholder({ kind = "bed", label, className = "" }: Props) {
  return (
    <div
      className={`@container absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-sand to-linen/70 ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox="0 0 240 160"
        className="h-auto w-[58%] max-w-72 text-accent/55"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {drawings[kind]}
      </svg>
      <span className="hidden whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted/80 @[220px]:block">Photo coming soon</span>
    </div>
  );
}
