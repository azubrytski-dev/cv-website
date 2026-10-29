# CV Website

Personal CV / portfolio for Andrei Zubrytski. The Next.js app in `src/client` serves only the CV and its PDF download.

## Projects

This repository uses npm workspaces with one root lockfile:

| Folder | Package | Purpose |
| --- | --- | --- |
| `src/client` | `cv-website` | CV website: profile, skills, experience, education, PDF export |
| `src/blog` | `@cv/blog` | Optional blog UI, markdown content, and server loaders |
| `src/beats` | `@cv/beats` | Optional beats UI and original design references |
| `src/design-system` | `@cv/design-system` | Shared style tokens, MUI themes, and neutral surfaces |

Blog and beats are separate source packages. They have no routes or navigation links in the CV app and are not imported by it. Each package has its own manifest and TypeScript configuration; neither depends on CV components or data.

## Development

Install from the repository root (Node.js 20+):

```bash
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build`, `npm run typecheck`, `npm run lint`, and `npm test` from the root. Tests use Jest with the Next.js compiler (`next/jest`), including keyboard activation and focus restoration for experience dialogs. Workspace scripts can also be run directly, for example `npm run typecheck --workspace=@cv/blog`.

For Vercel, keep **Root Directory** set to `src/client` and the **Framework Preset** set to Next.js. Include the sibling workspace source files in the build. `src/client/vercel.json` sets the install command to `npm ci --include=dev --include-workspace-root` and the build command to `npm run build`; retain the default Next.js output directory.

The install flags are required because ESLint, TypeScript, Sass, and the shared type/test tooling are development dependencies of the workspace root. They must be present during builds, including production-mode installs started from `src/client`. The configuration uses the repository's npm lockfile and keeps build-time lint/type checks enabled. For other hosts, install from the repository root with development dependencies included, build with `npm run build`, and serve with `npm start`.

## CV layout

The page presents an open introduction, a role timeline with inline contributions and explicit details buttons, compact skill groups, education rows, and a fixed, single-line contact footer. A desktop section rail (1200px and wider) tracks headings at 25% of the usable viewport with IntersectionObserver and frame-throttled geometry checks; smaller screens retain compact section links in the fixed header. Shared layout tokens reserve space for the header, footer, and rail, including mobile safe areas. Existing career and education records remain the content source.

## Shared styling

`src/design-system/src/tokens.ts` is the source of truth for colors, fonts, radii, motion, and layout values. `createSiteTheme(mode)` derives the MUI theme and namespaced `--cv-*` CSS properties from those tokens. The CV app installs the theme through `ThemeProvider` and `CssBaseline` and switches both together.

Reusable modules inherit the host MUI theme and CSS properties. They do not install global resets, hardcode dark/light palettes, or create a second theme provider. See [the design-system contract](src/design-system/README.md).

## Adding optional modules later

See [blog integration](src/blog/README.md) and [beats integration](src/beats/README.md). The route files under each package's `examples/` folder are inactive examples; copy them into the CV route tree only when enabling that module.

Portfolio data remains local to the CV app. Generated build output is ignored and should be recreated during deployment.

## Downloadable CV

`src/client/src/data/cv.ts` is the presentation-independent CV source shared by the introduction, skill groups, experience dialogs and PDF. Experience and education records live in their existing model files and are composed into this source; contact details are defined in the shared data module.

`/api/cv` generates a text-based A4 PDF using PDFKit, with embedded, openly licensed Lato fonts in `src/client/public/fonts`. It uses a fixed print palette, independent of the website theme and viewport. The current content occupies two pages; recent positions retain three bullets and older positions use two. Roles stay together, and section headings remain with their opening content. The download filename remains `andrei-zubrytski-cv.pdf`.

The hero uses the separate transparent waist-up asset in `src/client/src/shared/img/hero-portrait.webp`, generated from the selected photo reference. The source head crop remains available separately.

Scrollspy never writes a hash during passive scrolling. Hash-free visits reset to Overview at the top, while intentional section deep links remain supported. Manual candidates stabilize for 120ms, and clicked destinations stay highlighted during smooth scrolling until completion or user interruption.
