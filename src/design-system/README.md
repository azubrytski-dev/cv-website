# @cv/design-system

Shared source package for the CV website and optional modules. Built and resolved by the host bundler; all React, MUI, and Emotion runtime dependencies are peers, so modules share the host instances.

## Host setup

```tsx
import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme, lightTheme } from '@cv/design-system';

<ThemeProvider theme={isDark ? darkTheme : lightTheme}>
  <CssBaseline />
  {children}
</ThemeProvider>
```

`CssBaseline` emits `--cv-*` variables at the document root and on optional `data-cv-theme="dark"` / `data-cv-theme="light"` scopes. This also makes variables available to MUI dialogs rendered through portals. Switching the host theme updates both MUI and CSS variables. Use `createSiteTheme('dark' | 'light')` when composing a theme yourself.

For Next.js, add `@cv/design-system` to `transpilePackages`.

## Module contract

Use MUI semantic values such as `primary.main`, `text.primary`, `text.secondary`, and `background.paper` in `sx`. For CSS or inline styles, inherit the namespaced tokens:

| Role | CSS properties |
| --- | --- |
| Colors | `--cv-color-primary`, `--cv-color-secondary`, `--cv-color-link`, `--cv-color-border` |
| Backgrounds | `--cv-color-background`, `--cv-color-surface`, `--cv-color-overlay`, `--cv-page-background` |
| Text | `--cv-color-text`, `--cv-color-muted`, `--cv-color-on-primary` |
| Accents | `--cv-color-accent`, `--cv-primary-rgb`, `--cv-accent-rgb` |
| Fonts | `--cv-font-primary`, `--cv-font-mono` |
| Shape | `--cv-radius-card`, `--cv-radius-button`, `--cv-radius-pill` |
| Layout | `--cv-navbar-height`, `--cv-footer-height`, `--cv-content-width`, `--cv-site-width`, `--cv-rail-width`, `--cv-rail-gap` |
| Controls | `--cv-control-height`, `--cv-control-gap` |
| Motion | `--cv-motion-normal`, `--cv-motion-fast` |
| Surfaces | `--cv-glass-background`, `--cv-glass-border`, `--cv-glass-shadow` |
| Markdown | `--cv-code-background`, `--cv-code-text` |

For example: `background: rgb(var(--cv-primary-rgb) / 8%)`. `getSurfaceStyles()` returns the neutral, bordered surface style. `getGlassSurfaceStyles(theme)` remains a compatibility alias for the optional modules.

Do not add global element selectors or duplicate palette values in optional modules. Keep CV-specific layout rules in the client. Edit `src/tokens.ts` to change shared visuals, then run `npm run typecheck` and `npm run build` at the repository root.

The visual system uses a slate and forest-green palette, system sans-serif typography, neutral surfaces, 10px corners, and no glow, gradients, or surface blur. Headings use the primary text color; links and actions use the accent. Dialogs use the same surface and border tokens. Buttons have modest corners; pill shapes are reserved for small tags. Reduced-motion preferences disable animation and transitions.

`tokens.control` sets a 44px minimum button height, 24px horizontal padding, and 12px action spacing. The CV footer remains fixed with reserved page padding; its contact links become labeled icons on narrow screens. Section links share active state, use `aria-current="location"`, and honor reduced motion when scrolling.
