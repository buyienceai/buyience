# Graphics prompts — Composable Commerce for B2B

**Blog:** [Composable Commerce for B2B — A Decision Guide](/blog/composable-commerce-for-b2b-a-decision-guide)

**Slug:** `composable-commerce-for-b2b-a-decision-guide`

**MDX:** `content/blog/composable-commerce-for-b2b-a-decision-guide.mdx`

---

## Shared style (all in-article graphics)

Clean B2B diagram aesthetic — soft white or very light lavender (`#F4EFFF`) background, navy/violet accents (`#1a0b3c` / `#6B4EFF`), crisp sans-serif labels, thin borders, no photos, no cluttered UI, no watermarks. Prefer flat vector / editorial diagram look over 3D. Buyience violet accent sparingly; optional small Buyience mark bottom-right only where noted.

| Variant | Size |
| --- | --- |
| Desktop diagram | **1600 × 900** |
| Mobile variant | **1080 × 1350** (4:5) — stacked layout, larger labels |

---

## 1 — Promise vs gap

**Insert after:** `## The Promise and the Gap`

### Desktop (1600 × 900)

```
Editorial B2B diagram, 1600×900, light lavender-white background. Split comparison:

LEFT panel titled “Composable architecture (what teams buy)”: neat modular blocks labeled Pricing, Catalog, Checkout, Inventory, Order — connected by clean API arrows. Looks polished and complete.

RIGHT panel titled “B2B reality (what still breaks)”: same blocks, but a tangled dashed path labeled Quoting → Approvals → Negotiation → Reorder crossing all of them, with sticky notes “manual handoff” and “email approval”.

Center caption: “Services are composed. Workflows aren’t.”
Navy + violet accents, large readable labels, minimal icons, no photos, no logos except optional small Buyience mark bottom-right.
```

### Mobile (1080 × 1350)

```
Same concept as the Promise vs gap desktop diagram, but portrait 1080×1350. Stack vertically: architecture panel on top, workflow tangle below. Larger type for phone readability. Light lavender-white background, navy + violet accents, no photos, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-promise-vs-gap.png` (+ `-mobile.png`)

---

## 2 — Three composability layers (hero diagram)

**Insert after:** `## The Three Composability Layers B2B Teams Actually Need`

### Desktop (1600 × 900)

```
Clean 3-layer architecture diagram, 1600×900, white/light lavender background.

Three horizontal stacked bands, clearly labeled:

TOP band (lightest): “1. Infrastructure composability” — icons for Cloud, Containers, CI/CD. Caption: “Table stakes — deploy independently.”

MIDDLE band: “2. Service composability” — cards: Pricing API, Catalog API, Inventory API, Checkout API. Caption: “Best-of-breed services.”

BOTTOM band (emphasized with violet border): “3. Workflow composability” — a flowing pipeline: Quote → Price resolve → Inventory check → Margin floor → Approval → Order. Caption: “The layer B2B actually needs.”

Add a callout arrow pointing at layer 3: “Most stacks stop at layer 2.”
Flat vector, navy text, violet accents, generous spacing, no 3D, no screenshots.
```

### Mobile (1080 × 1350)

```
Same three-layer composability diagram as desktop, portrait 1080×1350. Stack the three bands vertically with bigger labels; workflow pipeline on layer 3 can wrap to two rows. Emphasize layer 3 with violet border. Flat vector, no photos, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-three-layers.png` (+ `-mobile.png`)

---

## 3 — Where workflow composability breaks

**Insert after:** `## Where Workflow Composability Breaks Down`

### Desktop (1600 × 900)

```
Three-column failure-mode diagram, 1600×900, light background.

Column 1: “Composable pricing, not contextual” — pricing service box alone; dashed missing links to Contract terms, Inventory, Margin floor. Rep silhouette assembling context manually.

Column 2: “Composable approvals, not connected” — approval inbox with quote PDF; missing context chips: discount logic, inventory, customer history.

Column 3: “Composable inventory, not real-time at quote” — quote created first, inventory check AFTER with red “allocation changed → re-approve”.

Footer label: “Services composed. Workflow sequential + manual.”
Clean icons, navy/violet, no photos of people (use simple geometric avatars if needed).
```

### Mobile (1080 × 1350)

```
Same three failure-mode panels as desktop, portrait 1080×1350, stacked vertically. Larger labels, light background, navy/violet accents, no photos, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-workflow-breaks.png` (+ `-mobile.png`)

---

## 4 — Decision framework checklist

**Insert after:** `## The Decision Framework: Evaluating Composable Commerce for B2B`

### Desktop (1600 × 900)

```
Decision framework visual, 1600×900. Title: “Evaluate composable commerce for B2B”.

Five numbered checklist cards in a vertical flow (or 2+3 grid):

1. Map revenue-critical workflows first (quote-to-order, pricing, approvals…)
2. Require co-resolution at the point of action
3. Integration ≠ workflow composability
4. Treat approvals as first-class, not “later”
5. Calculate orchestration cost, not just service cost

Each card has a tiny icon and one short subline. Right side: a small “pass / fail” meter labeled “Workflow layer ready?”
Light background, navy type, violet numbers, flat vector, highly readable.
```

### Mobile (1080 × 1350)

```
Same decision framework checklist as desktop, portrait 1080×1350, single-column with large numbers. Light background, navy + violet, flat vector, no photos, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-decision-framework.png` (+ `-mobile.png`)

---

## 5 — Co-resolution vs middleware stitching

**Insert after:** `## Where This Connects to Platform Architecture`

### Desktop (1600 × 900)

```
Side-by-side architecture comparison, 1600×900.

LEFT: “Integration / middleware stitching” — Pricing, Inventory, Customer, Approvals as separate boxes; a thick slow middleware bus in the middle; clock icons and “latency / consistency risk” labels; sequential arrows 1→2→3→4.

RIGHT: “Native co-resolution” — same four domains sharing one unified data layer; single transaction bubble labeled “Quote decision resolves together”; API arrows outward for frontend/ERP still present.

Bottom caption: “Independently deployable services. Cohesively resolved workflows.”
Navy/violet, clean diagram, no product UI screenshots.
```

### Mobile (1080 × 1350)

```
Same co-resolution vs middleware comparison as desktop, portrait 1080×1350. Stack left panel then right panel. Larger type, navy/violet, flat vector, no screenshots, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-co-resolution.png` (+ `-mobile.png`)

---

## 6 — Readiness assessment

**Insert after:** `## The Readiness Assessment: Is Your Stack Ready for Composable B2B?`

### Desktop (1600 × 900)

```
Two-panel readiness scorecard, 1600×900.

LEFT green-tinted panel “Ready for composable B2B”:
• Workflows documented
• Monolith constraints identified
• API capability available
• Processes stable enough to decompose

RIGHT amber/red-tinted panel “Not ready yet”:
• Informal / rep-dependent workflows
• Escaping lock-in with no workflow target
• No visibility into deal friction
• Knowledge in people’s heads, not rules

Center: “Document workflows before decomposing architecture.”
Clean corporate diagram style, navy + violet + soft green/amber, no photos.
```

### Mobile (1080 × 1350)

```
Same readiness scorecard as desktop, portrait 1080×1350. Stack “Ready” panel then “Not ready yet” panel. Larger type, navy + violet + soft green/amber, no photos, no watermarks.
```

**Suggested filename:** `public/blog/inline/composable-commerce-readiness.png` (+ `-mobile.png`)

---

## Optional — Cover refresh

**Current cover:** `public/blog/covers/composable-commerce-for-b2b-a-decision-guide.png`  
**Used on:** [blog post page](/blog/composable-commerce-for-b2b-a-decision-guide) (hero + OG)

Only if replacing the portrait-style cover with a topic visual:

### Laptop (1488 × 720)

```
Buyience B2B blog cover, landscape 1488×720. Dark navy-to-royal-purple gradient, soft violet bokeh/arc, white BUYIENCE logo (B-in-circle + wordmark) top-left. Bold white sans headline left: “Composable Commerce for B2B — A Decision Guide”. Right: thin light-blue rounded frame containing a symbolic 3-layer workflow diagram (Infrastructure / Services / Workflow), not a portrait. No watermarks, no other logos. Safe inset ~80px.
```

### Mobile (1080 × 1350)

```
Same Buyience cover system, portrait 1080×1350. Logo top → headline “Composable Commerce for B2B — A Decision Guide” → framed 3-layer diagram below. High contrast, sparse, phone-readable. No portrait, no watermarks.
```

---

## Placement checklist

| # | Section heading | Desktop asset | Mobile asset |
| --- | --- | --- | --- |
| 1 | The Promise and the Gap | `composable-commerce-promise-vs-gap.png` | `…-mobile.png` |
| 2 | The Three Composability Layers… | `composable-commerce-three-layers.png` | `…-mobile.png` |
| 3 | Where Workflow Composability Breaks Down | `composable-commerce-workflow-breaks.png` | `…-mobile.png` |
| 4 | The Decision Framework… | `composable-commerce-decision-framework.png` | `…-mobile.png` |
| 5 | Where This Connects to Platform Architecture | `composable-commerce-co-resolution.png` | `…-mobile.png` |
| 6 | The Readiness Assessment… | `composable-commerce-readiness.png` | `…-mobile.png` |

After PNGs are generated, add them in the MDX as:

```md
![](/blog/inline/composable-commerce-three-layers.png)
```
