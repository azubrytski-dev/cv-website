# CV Website Architecture

The repository contains four npm workspaces: `src/client`, `src/blog`, `src/beats`, and `src/design-system`. Installation and the lockfile live at the repository root.

The active Next.js application in `src/client` serves `/` (CV) and `/api/cv` (PDF download). `PortfolioGrid` composes the introduction, experience timeline, compact skill groups, education rows, and contact footer. Local portfolio models and services remain inside the CV project.

The root layout loads CV-specific CSS/SCSS. `Providers` selects the shared MUI dark/light theme, installs `CssBaseline`, renders the CV navigation and theme toggle, and wraps page content in the main container. The footer is fixed to the viewport; page padding reserves its height and safe area. On desktop, a separate grid column holds a sticky section rail. The header keeps compact links on smaller screens. `useSectionNavigation` selects the last heading above a line 25% down the usable viewport between the fixed header and footer. IntersectionObserver and a frame-throttled scroll listener both sample the same geometry; candidates stabilize for 120ms. An explicit document-bottom check selects the final section. Intentional navigation locks the clicked highlight until scrollend or scroll inactivity, and user scroll gestures cancel the lock. Fresh hash-free visits start at the top with Overview active; only intentional clicks change the hash.

`@cv/design-system` owns semantic tokens, MUI theme creation, namespaced CSS variables, and neutral surface styling. Tokens are defined once in TypeScript and emitted by the theme for both MUI and plain CSS consumers. The selected theme supplies variables at the document root and at optional theme scopes, including portal content.

Blog and beats are optional source packages. They have separate manifests and type-check configurations and are not imported or routed by the CV app. Blog owns its markdown content, models, renderer, and server loader; beats owns its view and design references. Each consumes the host theme rather than installing global CSS or a separate theme provider.

Inactive route examples and reintegration instructions live in each optional package. Generated builds are ignored and rebuilt for deployment. See the root README for development commands and deployment configuration.
