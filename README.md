# NexaFlow AI - Hackathon MVP

## Problem

The challenge asks for a premium, high-converting, responsive landing page for an AI-driven data automation platform. The scoring focuses on:

- Dynamic multi-currency pricing from a configuration matrix
- Billing/currency state isolation with no global re-render behavior
- Desktop bento feature layout that becomes a mobile accordion
- Active feature context persistence during resize
- Semantic HTML, SEO metadata, fast native motion, and correct asset usage

Submission-only requirements such as public repository, deployment link, and final uploaded video are intentionally not handled here.

## Solution

NexaFlow AI is a fictional SaaS platform that automates data operations. The MVP presents a judge-ready landing page with hero storytelling, feature architecture, dynamic pricing, social proof, responsive behavior, and local organizer assets.

## Features

- Responsive hero section with product-console visual
- Semantic sections: header, main, feature section, pricing section, proof section, footer
- Bento feature grid on desktop
- Touch-friendly accordion on mobile
- Active bento/accordion index is preserved across viewport resize
- Pricing engine uses:
  - base tier rates
  - 20% annual discount multiplier
  - currency conversion
  - regional tariff factor
- Pricing updates only the price text nodes and pricing control classes
- SEO title, description, keywords, Open Graph tags, and theme color
- Native CSS transitions and animations only
- No banned UI libraries, animation libraries, or external resources

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Provided SVG assets
- Provided color palette
- Font policy from provided font list:
  - JetBrains Mono for headings/code-style UI
  - Inter for body/UI text

## Setup Steps

Open the app directly in a browser:

```text
app/index.html
```

No installation is required.

## Folder Structure

```text
Hackathon/
  app/
    assets/
      svg/
      color_palette.jpg
      reference-demo.mp4
    app.js
    index.html
    styles.css
  provided-assets/
  FB_Round_1.pdf
  Provided assets.zip
  README.md
```

## Demo Flow

1. Start on the hero and explain that NexaFlow AI turns raw operational data into automated business decisions.
2. Scroll to the metrics strip to show business impact.
3. Move to the features section on desktop and hover different bento cards.
4. Resize to mobile width and show that the same active feature opens inside the accordion.
5. Go to pricing and switch Monthly/Annual billing.
6. Change currency between INR, USD, and EUR.
7. Explain that prices are calculated from a matrix and only price text nodes update.
8. End with social proof and mention semantic SEO/performance choices.

## Future Scope

- Add real product screenshots or analytics integrations
- Add authenticated dashboard prototype
- Connect pricing matrix to a CMS or backend API
- Add automated Lighthouse and performance checks
- Add deployment pipeline after final submission requirements are ready

## Pitch Notes

- The build is dependency-free, which directly avoids banned component and animation libraries.
- Pricing uses a multi-dimensional matrix instead of hardcoded UI strings.
- The bento-to-accordion transition preserves context, matching the most technical interaction requirement.
- The UI uses the organizer palette, SVG icon pack, and font guidance consistently.
- Semantic HTML and crawlable text support the SEO scoring category.
