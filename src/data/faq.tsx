import Link from "next/link";
import type { FaqItem, PageLink } from "@/components/content/ContentBlocks";

/** Answers repeated on several pages. Keep them true to how you sell; edit here and every page updates. */
export const faqGenuine: FaqItem = {
  question: "Is this genuine IKEA furniture?",
  answer: (
    <p>
      Yes, our IKEA-branded items are genuine IKEA furniture that has had a previous owner. We are an independent
      reseller: we are not part of IKEA and not affiliated with or endorsed by IKEA.
    </p>
  ),
};

export const faqDelivery: FaqItem = {
  question: "Do you deliver in Dubai, Sharjah, Ajman and Abu Dhabi?",
  answer: (
    <p>
      We serve customers across the UAE, including Dubai, Sharjah, Ajman and Abu Dhabi. Message us on WhatsApp with
      your area and we will confirm the delivery options for the item you want. <Link href="/delivery-areas">See areas we serve</Link>.
    </p>
  ),
};

export const faqHowToBuy: FaqItem = {
  question: "How do I buy?",
  answer: (
    <p>
      Choose a colour and size on the product page and tap the WhatsApp button. We confirm availability, send extra
      photos if you want them and arrange the details with you.
    </p>
  ),
};

export const faqPhotos: FaqItem = {
  question: "Are the photos of the actual furniture?",
  answer: <p>Yes. The photos show the item for each colour and size we list. Ask us if you would like more photos or measurements.</p>,
};

export const categoryLinks: PageLink[] = [
  { href: "/beds", label: "Used IKEA beds", description: "MALM, BRIMNES and HEMNES with an IKEA mattress" },
  { href: "/daybeds", label: "Used IKEA daybeds", description: "BRIMNES and HEMNES with two mattresses" },
  { href: "/sofa-beds", label: "Used IKEA sofa beds", description: "FRIHETEN with storage" },
  { href: "/storage-beds", label: "Ottoman storage beds", description: "Lift-up beds with storage underneath" },
];
