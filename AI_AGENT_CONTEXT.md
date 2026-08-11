# RIZEEWEB - Architecture & AI Context Document

This document is intended for future AI agents, developers, and maintainers to understand the complete architecture, design philosophy, and technical implementation of the RizeeWeb portfolio website.

## 1. Project Overview
**RizeeWeb** is a high-end freelance/agency web development portfolio built for Aadesh. The goal of this project was to create a "$100k agency-level" experience characterized by buttery smooth interactions, premium typography, and a dark monochrome luxury aesthetic.

## 2. Technology Stack
* **Framework**: Next.js (App Router, React server/client components)
* **Styling**: Tailwind CSS v4 (configured via `@theme` in `globals.css`)
* **Animations**: GSAP (GreenSock) + `@gsap/react` + `ScrollTrigger`
* **Scrolling**: Lenis (`lenis/react`) for native smooth scrolling
* **Graphics**: Pure HTML5 `<canvas>` (No Three.js/WebGL dependencies)
* **Fonts**: Google Inter (configured via CSS variables)

## 3. Core Design Philosophy
* **Monochrome Luxury**: The site relies heavily on deep blacks (`#000`, `#0a0a0a`), subtle dark grays, and crisp white text. 
* **Motion over Static**: Elements should never simply "appear." Everything fades in, slides up, or reacts to scroll via GSAP.
* **Navigation**: Absolutely no instant "teleporting" via anchor links. All navigation is hijacked by Lenis to glide smoothly to the target section.

## 4. Key Components & Implementation Details

### `app/layout.tsx` & `app/page.tsx`
* **Layout**: Wraps the entire application in a `<SmoothScroll>` provider to ensure Lenis is instantiated globally. Also injects the Google Analytics (`G-PW85L3SYLR`) tags.
* **Page**: A single-page application structure that aggressively stacks sections: `HeroSection` -> `AboutSection` -> `ProjectsSection` -> `CapabilitiesSection` -> `PricingSection` -> `ContactSection`.

### `components/HeroCanvas.tsx` & `HeroSection.tsx`
* **The 3D Graphic**: Instead of relying on heavy 3D libraries, we wrote a high-performance pure HTML5 Canvas engine (`HeroCanvas.tsx`). It plots 250 nodes using a Fibonacci sphere distribution and calculates 3D rotation and depth perspective in real-time to render a spinning wireframe globe.
* **Animations**: Handled via `useGSAP` with scoped refs.

### `components/sections/ProjectsSection.tsx`
* **The Grid**: Uses a precise mathematical grid layout. 
  * "Cheerspace" (2 columns) uses `aspect-[16/9]`.
  * "Social Automations" (1 column) uses `aspect-[8/9]`. 
  * This guarantees they sit perfectly flush next to each other in the top row.
* **Aesthetics**: The cards use extremely subtle background typography (`text-white/[0.12]`) and dark gradients. Hovering triggers a frosted glass (`backdrop-blur-sm`) overlay and scales up the project information into the absolute center.

### `components/CustomCursor.tsx`
* Implements a custom dot cursor that tracks the mouse position. It specifically listens for hovers over `a` and `button` tags to smoothly scale up in size, replacing the default browser pointer.

### `components/SmoothScroll.tsx`
* Implements Lenis with a custom `lerp: 0.04` configuration to make the scrolling feel heavy, deliberate, and exceptionally smooth.

## 5. Security & Analytics
* **Analytics**: Google Analytics is loaded via Next.js `<Script>` tags in the root layout.
* **Spam Prevention**: The contact form inside `ContactSection.tsx` features a honeypot field (`<input name="_honey" style={{ display: "none" }} />`). Bots scraping the site will fill this out, allowing the backend/form handler to silently reject the submission.

## 6. Guidelines for Future AI Agents
If you are an AI reading this to make future updates, strictly adhere to the following rules:
1. **Preserve GSAP Scopes**: Always use `{ scope: sectionRef }` in your `useGSAP` hooks to prevent animation leaking across the SPA.
2. **Preserve Lenis**: If you add new navigation links, ensure they use `onClick={(e) => handleScrollTo(e, "#target")}` and pull the `lenis` instance via `useLenis()` rather than relying on default HTML anchors.
3. **Typography**: Always apply `font-[family-name:var(--font-inter)]` to text elements to ensure the brand typography remains consistent.
4. **Tooling**: Prioritize editing existing React components over installing new external packages. For example, if a complex graphic is needed, build it in Canvas before reaching for Three.js.
