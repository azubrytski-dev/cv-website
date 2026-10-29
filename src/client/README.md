# CV App

Next.js App Router application containing only the CV and `/api/cv` PDF download.

Install dependencies from the repository root using `npm ci`. Run `npm run dev`, `npm run build`, `npm start`, `npm run lint`, or `npm test` from the root; these scripts target this workspace. `npm run typecheck` at the root checks all projects.

- `src/app`: CV route, PDF endpoint, layout, and theme provider
- `src/components`: profile, skills, experience, education, navigation
- `src/models` and `src/services`: local portfolio content
- `src/styles`: CV layout and component styles using shared `--cv-*` tokens
- `src/themes`: shared theme re-exports

The only shared runtime dependency is `@cv/design-system`. Blog and beats live in sibling projects and are not bundled into this website. See the root README for deployment and future integration.

Tests use Jest and `next/jest` with React Testing Library. ESLint uses the Next.js Core Web Vitals rules in `eslint.config.mjs`. The legacy Create React App build/test tooling is no longer used.
