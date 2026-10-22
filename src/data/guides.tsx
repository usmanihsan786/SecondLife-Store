import Link from "next/link";
import type { ContentSection, FaqItem, PageLink } from "@/components/content/ContentBlocks";

/**
 * BUYING GUIDES. Each guide becomes a page at /guides/<slug>.
 * Keep them practical and true to how you actually sell. If something here does not match your stock
 * or your process (for example what is included), edit it before publishing.
 */
export type Guide = {
  slug: string;
  /** H1 on the page. */
  title: string;
  /** Title Google shows (" | SecondLife" is added). */
  seoTitle: string;
  description: string;
  /** Date the guide was written or last reviewed, YYYY-MM-DD. */
  updated: string;
  intro: string;
  sections: ContentSection[];
  faq?: FaqItem[];
  /** Pages to send readers to next: stock first, then other guides. */
  related: PageLink[];
};

export const guides: Guide[] = [
  {
    slug: "ikea-bed-sizes-uae",
    title: "IKEA Bed Sizes Explained: Single, Double, Queen and King in cm",
    seoTitle: "IKEA Bed Sizes in UAE: Single, Double, Queen, King (cm)",
    description:
      "IKEA beds in the UAE use European sizes: 90, 140, 160 and 180 × 200 cm. See which size is single, double, queen and king, and which mattress fits which frame.",
    updated: "2026-10-22",
    intro:
      "IKEA beds sold in the UAE are measured in centimetres, not in American twin, full, queen and king sizes. That causes a lot of confusion when you buy a used IKEA bed, so here is how the sizes line up and what to check before you buy.",
    sections: [
      {
        heading: "IKEA bed sizes at a glance",
        body: (
          <>
            <p>The size of an IKEA bed is the size of the mattress it takes, width × length:</p>
            <ul>
              <li><strong>90 × 200 cm</strong>: single bed</li>
              <li><strong>140 × 200 cm</strong>: double bed</li>
              <li><strong>160 × 200 cm</strong>: usually called queen size in the UAE</li>
              <li><strong>180 × 200 cm</strong>: usually called king size in the UAE</li>
            </ul>
            <p>
              The frame itself is wider and longer than the mattress. How much depends on the model: a MALM frame is
              compact, while a HEMNES or BRIMNES frame with a headboard takes more room. Ask us for the outside
              measurements of the exact bed you are looking at.
            </p>
          </>
        ),
      },
      {
        heading: "Which mattress fits which IKEA bed?",
        body: (
          <>
            <p>
              Match the mattress size to the bed size: a 160 × 200 cm IKEA bed needs a 160 × 200 cm mattress.
              Mattresses made for American sizes, or for other European sizes such as 150 × 190 cm, will either
              leave gaps or not fit.
            </p>
            <p>
              Our beds are sold together with an IKEA mattress of the right size, so you do not have to find one
              separately. Daybeds such as BRIMNES and HEMNES are different: they use two single mattresses that sit
              on top of each other as a sofa and side by side when the daybed is pulled out into a double bed.
            </p>
          </>
        ),
      },
      {
        heading: "How to choose the right size for a UAE apartment",
        body: (
          <>
            <p>
              Measure the room, then leave walking space on the sides you use to get in and out of bed and in front of
              wardrobes and doors. In a smaller bedroom or studio, a 140 cm double or a daybed often works better than
              a king. In a master bedroom, 160 or 180 cm gives two people more room.
            </p>
            <p>
              If you need storage, look at a bed with drawers or a lift-up storage bed. A daybed or sofa bed is the
              practical choice for a room that also has to work as a living space or guest room.
            </p>
          </>
        ),
      },
      {
        heading: "Before you buy a used IKEA bed",
        body: (
          <ul>
            <li>Confirm the size in cm, not only the name (single, queen, king).</li>
            <li>Ask whether the slatted base and all fittings are included.</li>
            <li>Check photos of the exact colour and size you want, not catalogue images.</li>
            <li>Ask about delivery to your area and whether the bed comes assembled or flat.</li>
          </ul>
        ),
      },
    ],
    faq: [
      {
        question: "Is an IKEA queen bed the same as a US queen?",
        answer: <p>No. IKEA beds sold in the UAE use 160 × 200 cm for queen. A US queen mattress is a different size, so check the centimetres.</p>,
      },
      {
        question: "What size is an IKEA double bed?",
        answer: <p>140 × 200 cm.</p>,
      },
      {
        question: "Do your used IKEA beds come with a mattress?",
        answer: (
          <p>
            Yes. Our <Link href="/beds">beds</Link> are sold with an IKEA mattress, and our{" "}
            <Link href="/daybeds">daybeds</Link> come with two IKEA mattresses.
          </p>
        ),
      },
    ],
    related: [
      { href: "/beds", label: "Used IKEA beds with mattress", description: "Single to king, with an IKEA mattress" },
      { href: "/products/ikea-malm-bed", label: "IKEA MALM bed", description: "90, 140, 160 and 180 cm" },
      { href: "/daybeds", label: "Used IKEA daybeds", description: "Two mattresses included" },
      { href: "/guides/ikea-malm-vs-brimnes-vs-hemnes", label: "MALM vs BRIMNES vs HEMNES" },
    ],
  },
  {
    slug: "buying-used-ikea-furniture-uae",
    title: "Buying Used IKEA Furniture in the UAE: A Practical Guide",
    seoTitle: "Buying Used IKEA Furniture in the UAE – What to Check",
    description:
      "Is second-hand IKEA furniture worth it? What to check on a used IKEA bed, daybed or sofa bed, how to compare listings, and how buying from us works.",
    updated: "2026-10-22",
    intro:
      "Second-hand IKEA furniture is one of the easiest ways to furnish a UAE apartment for less. The ranges are well known, sizes are standard and many pieces last for years. Here is what to look for so you get a good piece, whoever you buy from.",
    sections: [
      {
        heading: "Is second-hand IKEA furniture worth buying?",
        body: (
          <>
            <p>
              Often, yes. Popular IKEA ranges such as MALM, BRIMNES, HEMNES and FRIHETEN are made in standard sizes,
              so used pieces fit standard IKEA mattresses and covers. You also know what you are getting: you can look
              up the range and compare it with the item in front of you.
            </p>
            <p>
              The trade-off is condition. A used piece has had a previous owner, so the value depends on how well it
              has been kept and whether everything is included.
            </p>
          </>
        ),
      },
      {
        heading: "What to check on a used IKEA bed, daybed or sofa bed",
        body: (
          <ul>
            <li><strong>Size:</strong> confirm the mattress size in cm (see our <Link href="/guides/ikea-bed-sizes-uae">IKEA bed size guide</Link>).</li>
            <li><strong>Completeness:</strong> slats, side rails, drawers, fittings and, for sofa beds, the cushions and storage parts.</li>
            <li><strong>Frame condition:</strong> chips on corners and edges, swelling near the floor, wobbly joints.</li>
            <li><strong>Mattress condition:</strong> stains, sagging and smell. Ask for close-up photos.</li>
            <li><strong>Moving parts:</strong> drawers that slide, daybeds that pull out, sofa beds that open and close smoothly.</li>
            <li><strong>Genuine IKEA:</strong> ask which range it is. IKEA labels on the frame or mattress help confirm it.</li>
          </ul>
        ),
      },
      {
        heading: "Classifieds or a dedicated used IKEA seller?",
        body: (
          <p>
            Classifieds and marketplace groups can be cheap, but stock changes daily, photos vary and you usually
            arrange collection yourself. A dedicated seller lists the same ranges consistently, shows photos for each
            colour and size, and answers questions before you commit. Whichever you choose, ask for real photos of the
            exact item, not stock images.
          </p>
        ),
      },
      {
        heading: "How buying from us works",
        body: (
          <>
            <p>
              Choose a colour and size on the product page, then tap the WhatsApp button. The message includes the
              exact item, so we can confirm availability, send extra photos or measurements and answer questions about
              delivery to your area. See <Link href="/delivery-areas">delivery and areas</Link>.
            </p>
            <p>
              We are an independent business, not part of IKEA. We resell genuine IKEA furniture that has had a
              previous owner, and we describe its condition honestly.
            </p>
          </>
        ),
      },
    ],
    faq: [
      {
        question: "Where can I buy used IKEA furniture in Dubai?",
        answer: (
          <p>
            Marketplaces and classifieds have individual listings. We specialise in genuine used IKEA beds, daybeds and
            sofa beds; message us with your area in Dubai or elsewhere in the UAE to ask about delivery.{" "}
            <Link href="/shop">Browse current stock</Link>.
          </p>
        ),
      },
      {
        question: "Can I see more photos before buying?",
        answer: <p>Yes. Message us on WhatsApp and we will send extra photos or measurements of the exact item.</p>,
      },
    ],
    related: [
      { href: "/shop", label: "Shop all used IKEA furniture" },
      { href: "/beds", label: "Used IKEA beds" },
      { href: "/sofa-beds", label: "Used IKEA sofa beds" },
      { href: "/guides/ikea-daybed-vs-sofa-bed", label: "IKEA daybed or sofa bed?" },
    ],
  },
  {
    slug: "ikea-malm-vs-brimnes-vs-hemnes",
    title: "IKEA MALM vs BRIMNES vs HEMNES: Which Bed Should You Buy Used?",
    seoTitle: "IKEA MALM vs BRIMNES vs HEMNES: Used Bed Comparison",
    description:
      "MALM, BRIMNES and HEMNES are three of IKEA's best-known bed ranges. Compare their style, sizes and storage to choose the right used IKEA bed for your room.",
    updated: "2026-10-22",
    intro:
      "MALM, BRIMNES and HEMNES are the IKEA bed ranges people ask us about most. All three use standard IKEA mattress sizes, but they look and feel different. Here is how they compare when you are buying second-hand.",
    sections: [
      {
        heading: "IKEA MALM: simple and modern",
        body: (
          <p>
            MALM has a low, clean-lined frame with a plain headboard. It suits modern bedrooms and comes in several
            finishes. We list MALM in 90 (single), 140, 160 and 180 cm, in white, black and brown.{" "}
            <Link href="/products/ikea-malm-bed">See our used IKEA MALM beds</Link>.
          </p>
        ),
      },
      {
        heading: "IKEA BRIMNES: bright and practical",
        body: (
          <p>
            BRIMNES is a white range with a light, simple look. The range includes beds and a daybed, and some
            versions have drawers or a headboard with storage, so ask which features the bed you are looking at has.
            We list BRIMNES beds in Double, Queen and King and a BRIMNES daybed.{" "}
            <Link href="/ikea-brimnes">See our used IKEA BRIMNES furniture</Link>.
          </p>
        ),
      },
      {
        heading: "IKEA HEMNES: classic and traditional",
        body: (
          <p>
            HEMNES has a traditional style with panelled details, which suits classic and family homes. The HEMNES
            daybed is a popular choice for guest rooms because it works as a sofa and pulls out into a bed.{" "}
            <Link href="/ikea-hemnes">See our used IKEA HEMNES furniture</Link>.
          </p>
        ),
      },
      {
        heading: "Which one should you choose?",
        body: (
          <ul>
            <li><strong>Small or modern room:</strong> MALM, for its compact, minimal frame.</li>
            <li><strong>Want a bright, white bedroom:</strong> BRIMNES.</li>
            <li><strong>Classic style or a guest room that doubles as a lounge:</strong> HEMNES, especially the daybed.</li>
            <li><strong>Need extra storage:</strong> a version with drawers, or a <Link href="/storage-beds">lift-up storage bed</Link>.</li>
          </ul>
        ),
      },
    ],
    related: [
      { href: "/products/ikea-malm-bed", label: "Used IKEA MALM bed" },
      { href: "/ikea-brimnes", label: "Used IKEA BRIMNES" },
      { href: "/ikea-hemnes", label: "Used IKEA HEMNES" },
      { href: "/guides/ikea-bed-sizes-uae", label: "IKEA bed sizes in cm" },
    ],
  },
  {
    slug: "ikea-daybed-vs-sofa-bed",
    title: "IKEA Daybed or Sofa Bed? Choosing for a Small Apartment or Guest Room",
    seoTitle: "IKEA Daybed vs Sofa Bed – Which Is Better for Your Home?",
    description:
      "Compare IKEA daybeds such as BRIMNES and HEMNES with the FRIHETEN sofa bed: seating, sleeping comfort, storage and space, for UAE apartments and guest rooms.",
    updated: "2026-10-22",
    intro:
      "Both a daybed and a sofa bed give you seating by day and a bed at night, but they suit different rooms. Here is how IKEA's daybeds compare with the FRIHETEN sofa bed.",
    sections: [
      {
        heading: "How an IKEA daybed works",
        body: (
          <p>
            A daybed is a bed frame with a back and sides, so it looks like a sofa. BRIMNES and HEMNES daybeds use two
            single mattresses: stacked, they make a sofa or a single bed; pulled out side by side, they make a double.
            Sleeping on a proper mattress makes a daybed comfortable for regular use, which is why it is popular for
            kids&apos; rooms and guest rooms. Ours come with two IKEA mattresses.
          </p>
        ),
      },
      {
        heading: "How the IKEA FRIHETEN sofa bed works",
        body: (
          <p>
            FRIHETEN is a sofa first. It converts into a bed for guests and has a storage space for bedding. It is the
            better choice when the room is mainly a living room and the bed is only needed now and then.
          </p>
        ),
      },
      {
        heading: "Quick comparison",
        body: (
          <ul>
            <li><strong>Sleeping every night:</strong> a daybed, because you sleep on real mattresses.</li>
            <li><strong>Living room seating:</strong> a sofa bed, because it is a full sofa.</li>
            <li><strong>Storage:</strong> both can include storage. Check the item: drawers on a daybed, a storage space on FRIHETEN.</li>
            <li><strong>Space:</strong> measure the opened size as well as the closed size.</li>
          </ul>
        ),
      },
    ],
    related: [
      { href: "/daybeds", label: "Used IKEA daybeds" },
      { href: "/sofa-beds", label: "Used IKEA sofa beds" },
      { href: "/products/ikea-hemnes-daybed", label: "IKEA HEMNES daybed" },
      { href: "/products/ikea-friheten-sofa-bed", label: "IKEA FRIHETEN sofa bed" },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

export const guideLinks: PageLink[] = guides.map((g) => ({ href: `/guides/${g.slug}`, label: g.title }));
