# CV Website

Personal CV / portfolio site for Andrei Zubrytski.

The app now lives in `src/client` and uses Next.js App Router with React, MUI, and TypeScript.

## Project Structure

- `src/client/src/app` - Next.js routes and root layout
- `src/client/src/components` - reusable UI sections and cards
- `src/client/src/models` - portfolio data models and mock data
- `src/client/src/services` - data access helpers
- `src/client/src/styles` - global styles and shared visual utilities

## Running Locally

From the repository root:

```bash
cd src/client
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

Run these from `src/client`:

```bash
npm run dev
npm run build
npm start
npm test -- --watchAll=false
```

## Notes

- The app is currently using local mock data for portfolio content.
- The design uses glass-style surfaces and a category-based skills layout.
- When deploying to Vercel, point the project root to `src/client`.
