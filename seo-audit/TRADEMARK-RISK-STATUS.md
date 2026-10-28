# IKEA trademark-clearance risk: status (26 Oct 2026)

**Status: OPEN. The published name "IKEA Used Furniture" is NOT legally approved.**

## Facts
- "IKEA" is a registered trademark of Inter IKEA Systems B.V.
- Since 26 Oct 2026 18:03 UTC, Production (commit `437c853`, PR #3) uses "IKEA Used Furniture" as the store name, in the logo, the footer, inner-page title suffixes, Open Graph `site_name`, and WebSite/Organization structured data.
- No written permission from Inter IKEA Systems B.V. and no written legal opinion is on file.
- The business's trade licence name has not been confirmed to match.

## Why it matters
Using "IKEA" to sell genuine used IKEA products is lower-risk. Using it as the **business identity** (store name, logo, site name) can be treated as trademark infringement or as implying an official link. Possible outcomes include a cease-and-desist letter, a domain or platform complaint, or a forced rename. A forced rename would also undo the search-result branding.

## Already in place (reduces but does not remove risk)
- The footer and About page say the business is independent and not affiliated with, sponsored or endorsed by IKEA.
- No IKEA logo, typeface or blue/yellow colours are used.
- No `legalName` or licence details claim the name.

## Needed to close
1. Written permission from Inter IKEA Systems B.V., **or** a written opinion from a UAE trademark lawyer (Federal Decree-Law No. 36 of 2021).
2. A trade licence name (DED or free zone) consistent with the name used.

## If clearance is refused or advised against
Local branch `revert/rebrand-pending-clearance` (commit `1a60872`, not pushed) restores the site to `a0eb748`. The store name goes back to SecondLife, while the homepage title/H1 "IKEA Used Furniture" and all SEO changes stay. Publishing it needs the owner's explicit approval.

## Out of scope
The separate "IKEA Used Furniture" Google Business Profile belongs to the owner's brother. It must not be modified, claimed or linked.
