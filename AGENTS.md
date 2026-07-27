# TGS Web - Project Context

## Overview
Single-page marketing website for **The Graphics Shop** — a vinyl graphics, signage, and decal company based in Melville, Nova Scotia (North Shore).

## File Structure
```
tgs-web/
  index.html          # Single HTML file (~3782 lines, all CSS + JS inline)
  .gitignore
  artwork/
    tgs_logo/         # Logo assets (PNG + SVG)
  images/
    decals_labels/
    graphic_design/
    large_format/
    promo/
    signage/
    small_format/
    vehicles/
```

**Note:** The site is entirely self-contained in `index.html` — no build tools, no frameworks, no external dependencies beyond Google Fonts.

## Tech Stack
- **HTML5** with inline CSS and JavaScript
- **Google Fonts**: Poppins (headings), Barlow (body), Barlow Condensed (UI elements)
- **No frameworks, no build step** — pure static HTML

## Color Palette (CSS Variables)
```css
--teal:        #18C3C8    /* primary accent */
--teal-light:  #5FD6DB    /* teal highlight */
--teal-dark:   #0FAFA3    /* dark teal */
--teal-glow:   rgba(24, 195, 200, 0.3)  /* teal glow effects */
--dark:        #16191E    /* main background */
--darkgrey:    #2B3139    /* section bg */
--medgrey:     #363E48    /* section bg */
--lightgrey:   #A8B5C1    /* body text */
--white:       #FFFFFF    /* headings */
--font-heading: 'Poppins', sans-serif
--font-barlow: 'Barlow', sans-serif
--font-barlow-condensed: 'Barlow Condensed', sans-serif
```

## Page Sections (in order)
1. **Navigation** — fixed, glassmorphism navbar with logo + links + hamburger (mobile)
2. **Hero** — full-viewport with animated particles, geometric shapes, grid pattern, GS watermark
3. **Ticker** — scrolling marquee of service keywords (Vinyl Graphics, Vehicle Graphics, Fleet Branding, Window Graphics, Custom Signage, Wall Murals, Decals & Labels, Laminated Finishes)
4. **Services** — 6 cards (Vehicle Graphics, Window Graphics, Fleet Branding, Decals & Labels, Signage & Banners, Laminated Finishes)
5. **About** — image + equipment list (Roland SG-300, GCC Jaguar Cutter, 30" Royal Sovereign Laminator)
6. **Gallery** — 5-image masonry-style grid linking to Instagram (@specialtydd)
7. **Stats** — animated counters (20+ years, 1000+ projects, 98% satisfaction, 100% repeat)
8. **Google Reviews** — Google Reviews widget section
9. **Contact** — contact info, embedded Google Maps (70 Skinners Cove East Road, Melville, NS) + quote request form with live price calculator
10. **Quote Section** — product/material/laminate/substrate form with right-side estimate panel
11. **Footer** — social links, service links, company links, resource links

## Key Interactive Features
- **Navbar**: scroll effect (glassmorphism intensifies), mobile hamburger menu with overlay
- **Particles**: 30 animated particles in hero (JS-generated)
- **Scroll reveal**: IntersectionObserver-based fade-in animations
- **Counter animation**: stats numbers count up when scrolled into view
- **Quote calculator**: dynamic price estimation based on service type, dimensions, material, finish, quantity, and design help checkbox
- **Smooth scroll**: anchor link navigation with navbar offset
- **Form handler**: visual feedback on submission

## Logo Assets (artwork/tgs_logo/)
- `tgs_logo_darkbg_long.svg` — **currently used in navbar**
- `tgs_logo_darkbg_stacked.svg` — **currently used in footer**
- `tgs_logo_darkgreybg_long.png` / `tgs_logo_darkgreybg_stacked.png`
- `tgs_logo_greybg_long.png` / `tgs_logo_greybg_stacked.png`
- `tgs_logo_whitebg_long.png` / `tgs_logo_whitebg_stacked.png`
- `tgs_logo_sheet.png`
- `gs_only_teal.svg` / `gs_only_teal.png` — hero watermark
- `gs_only_grey.png` / `gs_only_darkgrey.png`

## Design Patterns
- Cards use `--darkgrey` backgrounds with teal accent hover effects
- Buttons use a scale-x transform for a sweep fill animation on hover
- Section dividers use teal gradient lines
- All animations use cubic-bezier easing for smooth transitions
- Mobile-first responsive breakpoints: 1024px, 768px, 480px

## Contact Details
- **Phone**: 289 893 2553
- **Email**: info@thegraphicsshop.ca
- **Instagram**: @specialtydd
- **Hours**: Mon–Fri 8AM–5PM, Sat 9AM–1PM
- **Address**: 70 Skinners Cove East Road, Melville, NS

## Important Notes
- Gallery images use Unsplash placeholder URLs — replace with actual project photos
- Form submission is cosmetic only (no backend integration)
- Google Maps embed uses approximate coordinates — update with exact pin
- Social links (Facebook, Twitter) in footer are dummy links
- "Vinyl Care Guide", "Material Options", "FAQ", "Privacy Policy" footer links are placeholders
