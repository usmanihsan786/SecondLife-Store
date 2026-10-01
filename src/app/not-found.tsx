import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-20 text-center sm:py-28">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-strong">Page not found</p>
      <h1 className="mt-3 max-w-xl font-display text-[2rem] font-semibold leading-tight text-ink sm:text-[2.75rem]">
        We could not find that page
      </h1>
      <p className="mt-3 max-w-md text-base text-muted">
        The page may have moved, or the item may no longer be listed. Have a look at what we have now.
      </p>
      <div className="mt-8 flex w-full flex-col justify-center gap-3 min-[420px]:w-auto min-[420px]:flex-row">
        <Link href="/shop" className={buttonClasses("primary", "lg")}>
          Back to Shop
        </Link>
        <Link href="/" className={buttonClasses("secondary", "lg")}>
          Back to Home
        </Link>
      </div>
    </Container>
  );
}
