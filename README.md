# Portfolio Website

A modern, responsive personal portfolio built with **[Astro](https://astro.build)**. Shared
navigation/footer are componentized, the design system lives in CSS variables (with a dark-mode
toggle), and projects support category filtering with scroll-reveal animations. Output is static
HTML with zero client-side framework — fast and SEO-friendly.

## Features

- **Component-based** — `Nav`, `Footer`, `ProjectCard` are reusable Astro components (no more
  copy-pasted markup across pages)
- **Dark mode** — toggle in the navbar, persisted in `localStorage`, applied before paint to avoid
  a flash of the wrong theme (respects `prefers-color-scheme`)
- **Project filtering** — category filter bar on `/projects`, powered by `data-category` + a small
  client script
- **Scroll-reveal** — elements with `.reveal` fade/slide in via `IntersectionObserver`
  (respects `prefers-reduced-motion`)
- **Responsive** — mobile hamburger menu, fluid grids, breakpoints at 992 / 768 / 480px
- **Contact form** — client-side validation with success/error alerts (see note below)

## Project Structure

```
portfolio/
├── astro.config.mjs        # Astro configuration
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── images/             # Static assets (profile + project screenshots)
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro   # HTML shell, <head>, theme init, global script
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   └── ProjectCard.astro
│   ├── data/
│   │   └── projects.ts        # Typed project data (edit here)
│   ├── pages/                 # One .astro file = one route
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── projects.astro
│   │   └── contact.astro
│   ├── scripts/
│   │   └── main.ts            # Theme toggle, nav, reveal, filter, form
│   └── styles/
│       └── global.css         # Design tokens + all component styles
└── legacy/                   # Original pre-Astro template files (safe to delete)
```

## Commands

```bash
npm install      # install dependencies
npm run dev      # start dev server at http://localhost:4321
npm run build    # build static site to ./dist
npm run preview  # preview the built site locally
```

> **Note on location:** esbuild (used by Astro/Vite) cannot resolve dependencies when the project
> lives inside a protected path such as **OneDrive** on Windows — the build fails with
> `Cannot read directory '../../..': Access is denied`. Keep this repository in a normal folder
> (e.g. `C:\Projects\portfolio`), **not** inside `OneDrive`.

## Customizing

- **Content** — edit the text directly in `src/pages/*.astro`. Project entries live in
  `src/data/projects.ts` (title, category, description, technologies, image, demo, github).
- **Images** — replace the files in `public/images/` (keep the same names, or update the `src`
  paths). The placeholders are named `*-REPLACE-ME.*`.
- **Colors / dark mode** — edit the CSS custom properties in `src/styles/global.css`
  (`:root` for light, `:root.dark` for dark).
- **Contact form** — `src/scripts/main.ts` validates client-side and shows a success alert. To
  actually receive messages, POST the form to a service such as
  [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com), or wire a backend
  endpoint where the `TODO` comment is in `initContactForm`.

## Deploying

The `npm run build` output in `dist/` is plain static HTML/CSS/JS — deploy it anywhere:

- **GitHub Pages** — push `dist/` (or use a GitHub Action to build & deploy).
- **Netlify / Vercel / Cloudflare Pages** — set the build command to `npm run build` and the
  publish directory to `dist`.

Set `site` in `astro.config.mjs` for correct absolute URLs if needed.
