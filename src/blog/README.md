# @cv/blog

Optional blog source package, disconnected from the CV website. Owns its views, models, markdown renderer, content loader, and all ten original markdown posts.

- `src/index.ts`: client components `Blog` and `BlogArticle`, plus public types
- `@cv/blog/server`: filesystem helpers `getBlogPosts`, `getBlogPostBySlug`, `groupBlogPosts`
- `content/`: markdown posts, grouped by category
- `examples/app/blog/`: inactive Next.js routes for future integration

The server loader requires an absolute content directory, so it works independently of the host working directory and bundler. It does not import CV skills or portfolio data. Keep the server entry point out of client components.

## Enable in the CV app later

1. Add `"@cv/blog": "0.1.0"` to `src/client/package.json`, then run `npm install` from the repository root.
2. Add `@cv/blog` to the client's `transpilePackages` alongside `@cv/design-system`.
3. Copy `examples/app/blog` into `src/client/src/app/blog`. The examples locate content relative to `src/client`; adjust the absolute directory if hosting elsewhere.
4. Add navigation when ready. The existing host `ThemeProvider` and `CssBaseline` supply all styling.

For standalone Next.js deployment/output tracing, set `outputFileTracingRoot` to the repository root and include `../blog/content/**/*.md` in `outputFileTracingIncludes` for `/blog` and `/blog/*`, so the markdown files ship with the server.

`Blog` and `BlogArticle` accept an optional `basePath` (default `/blog`) for mounting elsewhere. Both must receive the same path. The shared theme contract is documented in `../design-system/README.md`.

Run `npm run typecheck --workspace=@cv/blog` from the repository root.
