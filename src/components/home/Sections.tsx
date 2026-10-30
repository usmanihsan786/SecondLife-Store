import Link from "next/link";
import { ArrowRightIcon, CameraIcon, ChatIcon, ShieldCheckIcon, SparkleIcon, SwatchIcon, TruckIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { ArrowLink, SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { RotatingImage, RotationDots, RotationLink, RotationScope } from "@/components/ui/AutoRotate";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { categories, series, type CategoryId, type SeriesId } from "@/data/options";
import { guides } from "@/data/guides";
import { existingImage, getProducts } from "@/lib/catalog";
import { categoryFrames } from "@/lib/rotation-frames";
import { CollectionCard } from "./CollectionCard";

const countLabel = (n: number) => `${n} ${n === 1 ? "product" : "products"}`;

/**
 * Large photo tiles for the four product categories. Counts come from the product data.
 * Each tile rotates through real photos of the products in that category only (storage beds also show the
 * open storage photo, since that is what the bed is for).
 */
export function ShopByCategory() {
  const products = getProducts();
  const entries = (Object.keys(categories) as CategoryId[])
    .map((id) => {
      const inCategory = products.filter((p) => p.category === id);
      const frames = categoryFrames(inCategory, {
        href: categories[id].href,
        image: existingImage(categories[id].image),
        photosPerVariant: id === "storage-beds" ? 2 : 1,
      });
      return { id, ...categories[id], count: inCategory.length, frames };
    })
    .filter((c) => c.count > 0);

  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Categories"
          title="Shop used IKEA furniture by category"
          action={<ArrowLink href="/shop">Shop all furniture</ArrowLink>}
        />
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-8 sm:gap-5 lg:grid-cols-4">
          {entries.map((c, i) => (
            <li key={c.id}>
              <RotationScope swipe frames={c.frames.length ? c.frames : [{ src: "", alt: "", href: c.href }]} delay={400 + i * 700}>
                <RotationLink className="group block active:opacity-90" data-track="category" data-category={c.id}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
                    <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
                      {c.frames.length ? (
                        <RotatingImage sizes="(min-width: 1024px) 25vw, 50vw" />
                      ) : (
                        <SmartImage src={null} alt="" kind={placeholderKind(c.id)} sizes="(min-width: 1024px) 25vw, 50vw" />
                      )}
                    </div>
                    <RotationDots className="absolute bottom-3 left-3 z-[2] drop-shadow-[0_1px_2px_rgb(0_0_0/0.45)]" />
                  </div>
                  <h3 className="mt-3 flex items-start justify-between gap-2 text-base font-medium leading-snug text-ink sm:mt-4 sm:text-lg">
                    {c.title}
                    <ArrowRightIcon size={18} className="mt-0.5 hidden shrink-0 text-accent-strong transition-transform group-hover:translate-x-1 sm:block" />
                  </h3>
                  {/* On phones the two-column tiles keep just the name and count; the description shows from sm. */}
                  <p className="mt-1 hidden text-sm leading-snug text-muted sm:block">{c.blurb}</p>
                  <p className="mt-1 text-[0.8125rem] text-muted sm:mt-1.5">{countLabel(c.count)}</p>
                </RotationLink>
              </RotationScope>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The IKEA ranges we stock: an editorial list on phones, a row of collection cards from md. */
export function ShopBySeries() {
  const products = getProducts();
  const entries = (Object.keys(series) as SeriesId[])
    .map((id) => ({ id, items: products.filter((p) => p.series === id) }))
    .filter((e) => e.items.length > 0);

  return (
    <section className="border-y border-line bg-surface py-12 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Shop by IKEA series"
          description={<p>Browse by the range you know, from clean-lined MALM to classic HEMNES.</p>}
        />
        <ul
          className="mt-6 divide-y divide-line border-y border-line sm:mt-8 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-10 md:divide-y-0 md:border-0 lg:grid-cols-5"
          aria-label="IKEA series"
        >
          {entries.map(({ id, items }, i) => (
            <li key={id}>
              <CollectionCard
                title={series[id].label}
                description={series[id].blurb}
                href={series[id].href}
                image={existingImage(series[id].image)}
                kind={placeholderKind(items[0].category)}
                meta={countLabel(items.length)}
                frames={categoryFrames(items, { href: series[id].href, image: existingImage(series[id].image) })}
                delay={500 + i * 600}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const benefits = [
  { icon: ShieldCheckIcon, title: "Genuine IKEA items", text: "Real IKEA pieces from MALM, BRIMNES, HEMNES and FRIHETEN." },
  { icon: CameraIcon, title: "Photos of our own stock", text: "Each colour and size shows our own photos, not catalogue images." },
  { icon: SparkleIcon, title: "Condition stated clearly", text: "Every listing says its condition. Ask us for close-ups of anything." },
  { icon: SwatchIcon, title: "Sizes and colours", text: "Single to king, in white, gray, black, brown and beige, where available." },
  { icon: ChatIcon, title: "Direct WhatsApp enquiries", text: "Your message names the exact item, so you get a quick, clear answer." },
  { icon: TruckIcon, title: "Delivery enquiries", text: "Tell us your area in the UAE and we will tell you the delivery options." },
];

/** Short, verifiable reasons to buy here, with line icons instead of marketing cards. */
export function WhyBuy() {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Why shop with us" title="Good furniture, honestly presented" />
        <ul className="mt-6 grid grid-cols-1 gap-y-5 sm:mt-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-8 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 border-t border-line pt-4 sm:pt-5">
              <Icon size={22} className="mt-0.5 shrink-0 text-accent-strong" />
              <div>
                <h3 className="text-base font-medium leading-snug text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

// One of our own stock photos (a used IKEA HEMNES bed), not a staged or generated image.
const CONDITION_IMAGE = "/images/cards/hemnes-bed.webp";

export function ConditionSection() {
  const image = existingImage(CONDITION_IMAGE);
  const points = [
    "Every piece is second-hand, not brand new.",
    "We inspect furniture and select it for good condition.",
    "Photos are shown for each colour and size we have.",
    "Ask us for extra photos, close-ups or measurements before you decide.",
  ];
  return (
    <section className="border-y border-line bg-surface">
      <Container className="grid items-center gap-8 py-12 sm:py-20 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-surface-2 sm:aspect-[16/11] lg:aspect-[4/5]">
          <SmartImage src={image} alt="Used IKEA HEMNES bed in white, from our stock" sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div className="lg:max-w-lg">
          <SectionHeading
            eyebrow="Condition"
            title="Used furniture, carefully selected"
            description={
              <p>
                Our furniture is used IKEA furniture. Before we list a piece, we inspect it and only choose items in good
                condition, so you can furnish your home with genuine IKEA furniture for less.
              </p>
            }
          />
          <ul className="mt-7 divide-y divide-line border-y border-line">
            {points.map((text) => (
              <li key={text} className="flex items-start gap-3 py-3.5 text-[0.9375rem] text-ink">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {text}
              </li>
            ))}
          </ul>
          <div className="mt-7">
            <WhatsAppButton variant="secondary" message="Hello, could you send me more photos of an item on your website?">
              Ask for more photos
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

const orderSteps = [
  { title: "Choose your piece", text: "Pick the IKEA range, colour and size. Each option shows photos of our own stock." },
  { title: "Message us on WhatsApp", text: "Tap the WhatsApp button. Your message already includes the exact item you chose." },
  { title: "We confirm the details", text: "We confirm availability, send extra photos if you want them and tell you the delivery options for your area." },
];

/** Three steps from browsing to buying. */
export function OrderSteps() {
  return (
    <section className="py-12 sm:py-20" aria-labelledby="order-steps">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-16">
          <div>
            <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.16em] text-accent-strong">How it works</p>
            <h2 id="order-steps" className="font-display text-[1.875rem] leading-[1.08] text-ink sm:text-[2.375rem]">
              How to order on WhatsApp
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted sm:text-base">
              No account and no checkout. You talk to us directly before anything is agreed.
            </p>
          </div>
          <ol className="grid gap-6 sm:grid-cols-3 sm:gap-6">
            {orderSteps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.25rem_1fr] border-t border-ink pt-4 sm:block sm:pt-5">
                <span aria-hidden="true" className="font-display text-[2rem] leading-none text-accent sm:text-[2.5rem]">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-base font-medium text-ink sm:mt-3">{step.title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted sm:mt-1.5">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/** The existing buying guides as editorial cards. */
export function GuideCards({
  title = "Buying guides",
  eyebrow = "Before you buy",
  showAllLink = true,
}: {
  title?: string;
  eyebrow?: string;
  showAllLink?: boolean;
}) {
  return (
    <section className="py-12 sm:py-20">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} action={showAllLink ? <ArrowLink href="/guides">All guides</ArrowLink> : undefined} />
        <ul className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {guides.map((g) => (
            <li key={g.slug} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Link href={`/guides/${g.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-surface-2">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-soft)] motion-safe:group-hover:scale-[1.04]">
                    <SmartImage src={g.cardImage ? existingImage(g.cardImage) : null} alt="" kind="room" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  </div>
                </div>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-accent-strong">Guide</p>
                <h3 className="mt-1.5 text-[1.0625rem] font-medium leading-snug text-ink transition-colors group-hover:text-accent-strong">
                  {g.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{g.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function WhatsAppCta() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="grid items-center gap-6 rounded-[var(--radius-card)] bg-ink px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-[1fr_auto] lg:gap-12">
          <div>
            <h2 className="font-display text-[2rem] leading-tight text-white sm:text-[2.5rem]">Looking for a specific size or colour?</h2>
            <p className="mt-3 max-w-xl text-[0.9375rem] text-white/75 sm:text-base">
              Tell us what you are looking for and we will let you know what we have.
            </p>
          </div>
          <div className="flex flex-col gap-3 min-[420px]:flex-row lg:flex-col xl:flex-row">
            <WhatsAppButton variant="light">Message us on WhatsApp</WhatsAppButton>
            <Link href="/shop" className={buttonClasses("outline-light", "lg")}>
              Browse furniture
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
