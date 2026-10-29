# @cv/beats

Optional beats source package, disconnected from the CV website.

`src/Beats.tsx` exports a themed collection placeholder. It uses MUI and the host's shared style tokens. The original React view (`docs/Beats.original.tsx`), design template, and implementation notes are preserved in `docs/`; no Tailwind runtime or global styles are required by the exported component.

No tracks or audio sources were supplied. Player controls remain a future feature described by the design references.

## Enable in the CV app later

1. Add `"@cv/beats": "0.1.0"` to `src/client/package.json`, then run `npm install` from the repository root.
2. Add `@cv/beats` to the client's `transpilePackages` alongside `@cv/design-system`.
3. Copy `examples/app/beats` into `src/client/src/app/beats`.
4. Add navigation when ready. Use the existing host `ThemeProvider` and `CssBaseline`.

Run `npm run typecheck --workspace=@cv/beats` from the root. See `../design-system/README.md` for the style token contract.
