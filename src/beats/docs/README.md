# Beats demo reference

This directory preserves the Beats demo merged from `main`, separately from the CV application and the package's exported placeholder.

- `Beats.original.tsx`: original demo view with synthetic audio previews.
- `components/beats/`: player, cart, inquiry, and licensing components used by the demo.
- `models/Beat.ts` and `services/beats.service.ts`: demo contracts and mock track/licensing data.
- `implementation-plan.md`, `implementation.md`, and the HTML templates: historical plans and design references. Paths to `src/client` in these notes describe the original implementation.

These files are reference material, outside the package's `src` TypeScript build and exports. Enabling the package's example route still renders the themed placeholder. Future player integration should use the shared design tokens and replace demo content with real tracks and verified licensing terms.
