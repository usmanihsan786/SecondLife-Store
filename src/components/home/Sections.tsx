import Link from "next/link";
import { CameraIcon, ChatIcon, ShieldCheckIcon, SparkleIcon, SwatchIcon, TagIcon, TruckIcon } from "@/components/icons";
import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { placeholderKind } from "@/components/ui/ImagePlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { series, type SeriesId } from "@/data/options";
import { existingImage, getProducts } from "@/lib/catalog";
import { CollectionCard } from "./CollectionCard";

export function ShopBySeries() {
  const products = getProducts();
  const entries = (Object.keys(series) as SeriesId[])
    .map((id) => ({ id, items: products.filter((p) => p.series === id) }))
    .filter((e) => e.items.length > 0);

  // Editorial layout: wide first card on phones, 2 + 3 on tablets, one row on desktop.
  const spans = ["col-span-2 md:col-span-3 lg:col-span-1", "md:col-span-3 lg:col-span-1"];

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Shop by series"
          description={<p>Browse by the IKEA range you know.</p>}
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-6 lg:grid-cols-5">
          {entries.map(({ id, items }, i) => (
            <li key={id} className={spans[i] ?? "md:col-span-2 lg:col-span-1"}>
              <CollectionCard
                title={series[id].label}
                description={series[id].blurb}
                href={`/shop?series=${id}`}
                image={existingImage(series[id].image)}
                kind={placeholderKind(items[0].category)}
                meta={`${items.length} ${items.length === 1 ? "product" : "products"}`}
                wide={i === 0}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const benefits = [
  {
    icon: ShieldCheckIcon,
    title: "Genuine IKEA furniture",
    text: "Real IKEA pieces from well-known ranges such as MALM, BRIMNES, HEMNES and FRIHETEN.",
  },
  {
    icon: SparkleIcon,
    title: "Excellent condition",
    text: "Preloved furniture chosen for its condition, with clear photos of each option.",
  },
  {
    icon: TagIcon,
    title: "Affordable alternative",
    text: "A more affordable way to furnish your home than buying new.",
  },
  {
    icon: SwatchIcon,
    title: "Multiple sizes & colours",
    text: "From single beds to king size, in white, gray, black, brown and beige.",
  },
  {
    icon: TruckIcon,
    title: "Based in the UAE",
    text: "A local furniture selection. Ask us about available delivery options in the UAE.",
  },
];

export function WhyBuy() {
  return (
    <section className="border-y border-line/70 bg-sand/50 py-14 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Why buy from us" title="Good furniture, honestly presented" align="center" />
        <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 lg:flex-col lg:gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper text-accent-strong shadow-[var(--shadow-card)]">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="text-base font-medium text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

const CONDITION_IMAGE = "/images/hero/condition.webp";

export function ConditionSection() {
  const image = existingImage(CONDITION_IMAGE);
  const points = [
    { icon: ShieldCheckIcon, text: "Every piece is preloved, not brand new." },
    { icon: SparkleIcon, text: "We inspect furniture and select it for good condition." },
    { icon: CameraIcon, text: "Photos are shown for each colour and size we have." },
    { icon: ChatIcon, text: "Ask us for extra photos or details before you decide." },
  ];
  return (
    <section className="py-14 sm:py-20">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-sand lg:order-first">
          <SmartImage src={image} alt="Preloved furniture in good condition" kind="room" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div>
          <SectionHeading
            eyebrow="Condition"
            title="Quality furniture, carefully selected"
            description={
              <p>
                Our furniture is preloved. Before we list a piece, we inspect it and only choose items in good
                condition, so you can furnish your home with genuine IKEA furniture for less.
              </p>
            }
          />
          <ul className="mt-6 space-y-3">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-[0.9375rem] text-ink">
                <Icon size={20} className="mt-0.5 shrink-0 text-accent-strong" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function WhatsAppCta() {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <div className="rounded-2xl bg-espresso px-6 py-10 text-center sm:px-12 sm:py-14">
          <h2 className="font-display text-[1.75rem] font-semibold leading-tight text-paper sm:text-4xl">
            Looking for a specific size or colour?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] text-paper/80 sm:text-base">
            Tell us what you are looking for and we will let you know what we have.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 min-[420px]:flex-row">
            <WhatsAppButton variant="light">Message Us on WhatsApp</WhatsAppButton>
            <Link
              href="/shop"
              className={buttonClasses("ghost", "lg", "text-paper ring-1 ring-paper/30 hover:bg-paper/10 hover:text-paper")}
            >
              Browse furniture
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
