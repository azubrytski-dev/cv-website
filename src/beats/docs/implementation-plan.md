# Beats Page Implementation Plan

## Goal
Build a simple "My Beats" page that fits the existing website style first, while still honoring the beat-page mock direction.

The first version should only support:
- listing tracks
- starting and stopping playback
- moving to previous / next track
- showing a basic progress bar

Do not implement waveform rendering yet. A simple progress bar is enough for now.

## Future-Friendly Goal
Design the page so the music content can move from local mock data to storage later with minimal code changes.

That means:
- keep track and lease data in a data contract, not hardcoded inside UI components
- read content through a small service layer
- keep audio file URLs, cover art, and lease options data-driven
- make the admin/content source swappable later without rewriting the page

## Release Description
This release should deliver a clean, usable beats page that lets a visitor browse a small set of tracks, start playback, move between tracks, and see basic progress feedback.

The page is intentionally scoped as a minimal first version:
- it should feel finished enough to use
- it should not try to solve the advanced audio-visual experience yet
- it should stay easy to extend when waveform or richer player features are added later

## Lease Options
Add a reusable `LeaseOptions` section for beat licensing tiers so users can choose a purchase path before checkout.

This section should be usable on:
- the main Beatmaker page
- individual beat detail pages

### Component Contract
Suggested props:
- `beatId`
- `beatTitle`
- `selectedLease`
- `onLeaseSelect`
- `onCheckout`
- `onExclusiveInquiry`

### Storage Contract
Lease options should be stored as data, not embedded inside the component tree.

Suggested lease fields:
- `id`
- `name`
- `price`
- `includedFiles`
- `rights`
- `limitations`
- `recommended`
- `ctaLabel`
- `type`

Suggested beat fields:
- `id`
- `slug`
- `title`
- `artist`
- `previewUrl`
- `mp3Url`
- `wavUrl`
- `stemsUrl`
- `coverUrl`
- `bpm`
- `key`
- `tags`
- `leaseOptions`
- `status`

### Lease Types

#### 1. Basic Lease
- Price: `$29.99`
- Allows MP3 download
- Non-exclusive license
- Up to 10,000 streams
- Use for one song or project
- Credit must be given to the producer
- Button text: `Select Basic Lease`

#### 2. Premium Lease
- Price: `$49.99`
- Allows MP3 and WAV download
- Non-exclusive license
- Up to 50,000 streams
- Use for one song or project
- Monetization allowed on platforms like YouTube, Spotify, and Apple Music
- Credit must be given to the producer
- Button text: `Select Premium Lease`
- Mark this option as the recommended choice

#### 3. Unlimited Lease
- Price: `$99.99`
- Allows MP3, WAV, and track stems download
- Non-exclusive license
- Unlimited streams
- Monetization allowed
- Live performances allowed
- Use for one song or project
- Credit must be given to the producer
- Button text: `Select Unlimited Lease`

#### 4. Exclusive Rights
- Price: `Custom / Contact for price`
- Buyer receives exclusive ownership rights
- Beat is removed from public sale after purchase
- Unlimited streams and monetization
- Full commercial usage rights
- Includes all files: MP3, WAV, and stems
- Button text: `Contact for Exclusive Rights`

### Functional Requirements
- Display lease options in a responsive grid.
- On desktop, show cards in a row or grid layout.
- On mobile, stack cards vertically.
- Highlight the Premium Lease as the recommended option.
- Show clear bullet points for the included rights on every card.
- When a user clicks a lease option, store the selected lease type in state.
- The selected lease should appear visually active.
- Pass the selected lease information into the checkout or purchase flow.
- If `Exclusive Rights` is selected, show a contact form or navigate to a contact/request page instead of normal checkout.
- Keep the checkout handoff compatible with future storage-backed orders or inquiries.

### Design Requirements
- Match the existing Beatmaker page styling.
- Use a clean pricing-card UI.
- Include a small `Recommended` badge on the Premium Lease card.
- Use the primary brand color for buttons.
- Keep spacing, border radius, and hover states consistent across all cards.

## Design Principles
- Keep the page visually aligned with the current site theme and component language.
- Use the mock as inspiration for layout and mood, but let the website styles remain the primary source of truth.
- Prefer a small, decomposed component structure so future audio features can be added without rewriting the page.
- Keep interactions clear and predictable rather than fancy.
- Treat the UI as a thin layer over content data so future admin/storage work can slot in cleanly.

## Recommended Component Split

### 1. `BeatsPage`
Responsible for the full page layout and overall state wiring.

Responsibilities:
- page shell and spacing
- title / section header
- connect track data to the player
- keep the current track and playback state

### 2. `BeatHeader`
Renders the page title and short intro text if needed.

Responsibilities:
- show `My Beats`
- keep the header lightweight and centered or aligned according to the site layout

### 3. `TrackList`
Renders the available tracks.

Responsibilities:
- display track title, subtitle, and duration
- highlight the active track
- allow clicking a track to play it

### 4. `PlayerControls`
Renders the main transport controls.

Responsibilities:
- play / pause
- previous track
- next track
- optional shuffle if it already fits the current UI easily

### 5. `ProgressBar`
Shows current playback progress.

Responsibilities:
- display elapsed vs total time
- update as audio plays
- allow future scrubbing support later, but do not build waveform UI now

### 6. `TrackMeta`
Shows the currently selected track details.

Responsibilities:
- track name
- artist / source label
- short description or tags if available

## Data Shape
Use a small local track model for now.

Suggested fields:
- `id`
- `title`
- `artist`
- `sourceUrl`
- `duration`
- `coverUrl` or `accentColor` if needed for styling

Recommended source-of-truth pattern:
- define these models in a shared file or service boundary
- load them through a `getBeatsInformation` style helper, similar to the existing `portfolio.service.ts`
- later replace the helper implementation with database, CMS, or storage reads while keeping the UI mostly unchanged

## Implementation Steps

### Phase 1: Page Skeleton
- Create the beats page shell using the site’s layout patterns.
- Add header, content container, and responsive spacing.
- Match the existing site’s typography and surface styles first.

### Phase 2: Track List
- Render a small list of sample tracks.
- Show the selected track state.
- Allow track selection by clicking a row or card.
- Keep the track list driven by a data array or service result, not inline JSX.

### Phase 3: Audio Playback
- Wire a single shared `<audio>` element to the selected track.
- Implement play, pause, previous, and next.
- Keep playback logic isolated from presentational components.
- Make the selected track and audio source come from the same track model used by the service layer.

### Phase 4: Progress UI
- Track `currentTime` and `duration`.
- Render a simple horizontal progress bar.
- Show elapsed and total time in a readable format.

### Phase 5: Polish
- Tune spacing, hover states, and active states to match the website.
- Make sure mobile layout stays usable.
- Keep the page clean even with a small track list.

## What To Avoid For Now
- waveform rendering
- drag scrubbing
- playlist editing
- audio visualizers
- complex animations

## Acceptance Criteria
- The page loads with the site’s existing styling language.
- Users can see a list of tracks.
- Users can click a track to listen.
- Users can move to previous / next track.
- Users can see playback progress with a simple bar.
- The page remains simple enough to extend later.

## Notes
- The current mock HTML file is empty, so this plan should serve as the working implementation guide.
- If the current `src/client/src/views/Beats.tsx` already exists, the work should refactor it into the components above instead of growing it further.
- For future storage migration, keep audio file URLs, lease options, and track metadata separate from component logic.
- The eventual backend can be a CMS, database, or file-backed service, as long as the UI consumes the same shape.
