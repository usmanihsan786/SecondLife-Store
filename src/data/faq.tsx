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

// Confirmed by the owner (6 Nov 2026): delivery to all seven emirates. Fees and timings are quoted on WhatsApp, not here.
export const faqDelivery: FaqItem = {
  question: "Do you deliver across the UAE?",
  answer: (
    <p>
      Yes. We deliver to all seven emirates: Dubai, Sharjah, Ajman, Abu Dhabi, Ras Al Khaimah, Fujairah and Umm Al
      Quwain. Message us on WhatsApp with your area and the item you want, and we will confirm the delivery cost and
      timing. <Link href="/delivery-areas">Delivery across the UAE</Link>.
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
  answer: <p>Yes. We use photos of our own stock, not catalogue images. If a listing has no photo yet, or you would like more photos or measurements, ask us on WhatsApp.</p>,
};

export const categoryLinks: PageLink[] = [
  { href: "/beds", label: "Used IKEA beds", description: "MALM, BRIMNES and HEMNES with an IKEA mattress" },
  { href: "/daybeds", label: "Used IKEA daybeds", description: "BRIMNES and HEMNES with two mattresses" },
  { href: "/sofa-beds", label: "Used IKEA sofa beds", description: "FRIHETEN with storage" },
  { href: "/storage-beds", label: "Ottoman storage beds", description: "Lift-up beds with storage underneath" },
];
