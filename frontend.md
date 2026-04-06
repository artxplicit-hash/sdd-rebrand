# The Graphics Shop Frontend Guide

> Preserve this visual direction for future frontend updates.

## Brand Name
- **Business name:** `The Graphics Shop`
- **Current in-site header logo:** text-only wordmark using `Barlow Condensed`
- Current minimalist logo option:
  - `public/the-graphics-shop-logo-minimal.svg`
  - `public/the-graphics-shop-mark-minimal.svg`
- Previous concept remains available:
  - `public/the-graphics-shop-logo.svg`
  - `public/the-graphics-shop-mark.svg`
- Preferred logo direction: **modern, minimalist, text-first, using the same bold condensed style as the hero headline font**.

## Overall Look & Feel
- **Clean, modern storefront** inspired by premium ecommerce landing pages.
- **Light UI**, not dark/glassmorphism.
- **Polished showroom presentation** with a framed page shell and soft shadows.
- Tone should feel **professional, custom, fast, and easy to order**.

## Core Visual Rules
- Use a **light gray background** outside the main site shell.
- Keep the main page inside a **rounded white container** with subtle depth.
- Use **teal** as the primary accent color for CTAs and highlights.
- Headlines should stay **bold, condensed, uppercase**.
- Body copy should remain **clean, minimal, and easy to scan**.

## Design Tokens / Colors Used Across the Site
These are the main colors currently used in `style.css` and should remain the baseline palette:

- **Page background gradient:** `#edf1f4` → `#dde4ea`
- **Main surface / cards:** `#ffffff`
- **Soft section background:** `#f7f9fb`
- **Dark footer / CTA surface:** `#2b3139`
- **Primary accent teal:** `#18c3c8`
- **Accent hover / darker teal:** `#0d8f96`
- **Primary text:** `#2a2f36`
- **Muted paragraph text:** `#6f7783`
- **Borders / dividers:** `#e5e9ef`
- **Light teal highlight background:** `#e8fbfc`

## Typography / Fonts Used Across the Site
These are the exact fonts used in the redesign:

- **Heading font:** `Barlow Condensed`
- **Body font:** `Inter`

### Font usage rules
- Use **`Barlow Condensed`** for:
  - hero headlines
  - section titles
  - card headings
  - major promotional text
- Use **`Inter`** for:
  - paragraphs
  - navigation
  - buttons
  - supporting UI text

### Typography style notes
- Headings should be **bold, condensed, uppercase, and high impact**.
- Body copy should stay **clean, modern, short, and conversion-focused**.
- Avoid overly decorative fonts or script styles that conflict with the premium storefront look.

## Layout Structure

### 1. Browser-style top frame
- Keep the small **browser bar** at the top.
- Maintain the rounded shell aesthetic to match the reference inspiration.

### 2. Header / Navigation
- Sticky white header with subtle blur.
- Brand on the left, simple nav links in the middle, CTA on the right.
- Mobile menu should stay minimal and dropdown-based.

### 3. Hero Section
- Use a **large product-driven hero image**.
- Current approved hero asset: **`/hero-bg-v2.png`**.
- Left side: strong headline and CTA buttons.
- Right side: large image panel with soft overlay and badge.

### 4. Category Cards
- Keep the **3-card row** layout.
- Cards should use:
  - rounded corners
  - white background
  - soft shadow
  - image on top
  - short descriptive copy

### 5. Trust / Feature Strip
- Use compact trust cards for shipping, quality, custom design, and delivery.
- This section should feel supportive, not visually heavy.

### 6. Product Grid
- Product cards should stay clean and evenly spaced.
- Show image, product name, price, and one clear CTA.
- Avoid clutter or excessive badges.

### 7. CTA Band
- Keep the darker call-to-action section near the bottom.
- This provides contrast and a strong finish before the footer.

### 8. Footer
- Simple, compact, dark footer.
- Light text, minimal links, concise business info.

## Approved Imagery Direction
- Use real decal / vinyl / application / branded product imagery.
- Prioritize images that show:
  - vinyl printing
  - product application
  - branded packaging
  - custom installs
- Avoid abstract graphics or unrelated stock imagery.

## Interaction Style
- Hover effects should be **subtle**:
  - slight lift
  - slightly deeper shadow
  - gentle color change
- No flashy animation or overly aggressive motion.

## Responsive Behavior
- Preserve the current responsive stack:
  - desktop: wide hero + 3/4 column grids
  - tablet: 2-column sections
  - mobile: 1-column layout with dropdown nav

## Guardrails for Future Changes
- **Do not revert** to the older dark neon/glass UI.
- **Do not overcrowd** the homepage with too much text.
- **Do not replace** the clean storefront structure with a generic template.
- Keep the experience aligned with the current references: **premium, modern, minimal, product-led**.

## Files That Control This Look
- `index.html` — page structure and section order
- `style.css` — layout, colors, typography, spacing, and responsive behavior
- `main.js` — dynamic category/product rendering and mobile nav behavior

## Future Update Rule
If redesigning later, use this sentence as the baseline:

**"Keep the SpecialtyDD frontend in a clean, light, premium ecommerce style with teal accents, bold condensed headings, rounded cards, a framed storefront layout, and strong product-led imagery."**
