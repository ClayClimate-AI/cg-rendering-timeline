# CG Rendering Timeline

An interactive single-page application showcasing the evolution of computer graphics rendering technology — from Sketchpad (1963) to real-time ray tracing (2018). Built for ITAI 1370 Lab L04.

## Tech Stack

- **React 19** with **Vite 8** — fast development and optimized production builds
- **Tailwind CSS 4** — utility-first styling with custom design tokens
- **Three.js** via **React Three Fiber** — immersive 3D hero background with floating geometry and particles
- **Framer Motion** — scroll-triggered animations and micro-interactions

## Features

- Chronological timeline of 8 major rendering milestones
- AI-generated illustrative imagery for each milestone
- Accessible, plain-language descriptions for non-technical audiences
- Reflective analysis section on AI visuals in education
- Interactive 3D scene, hover effects, and scroll animations
- Fully responsive mobile design
- Netlify-ready deployment configuration

## Quick Start

### Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm 9+

### Install & Run

```bash
# Clone or navigate to the project directory
cd cg-rendering-timeline

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

The production build outputs to the `dist/` folder.

## Project Structure

```
cg-rendering-timeline/
├── public/
│   ├── images/          # AI-generated milestone illustrations
│   ├── _redirects       # Netlify SPA routing
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Scene3D.jsx      # Three.js 3D background
│   │   ├── Hero.jsx         # Landing section
│   │   ├── Timeline.jsx     # Milestone timeline
│   │   ├── MilestoneCard.jsx
│   │   ├── Analysis.jsx     # Reflective analysis
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── milestones.js    # Timeline content & analysis
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── netlify.toml
├── vite.config.js
└── package.json
```

## Deploy to Netlify

### Option A: Git-based Deploy (Recommended)

1. Push the project to a GitHub, GitLab, or Bitbucket repository.
2. Log in to [Netlify](https://www.netlify.com/) and click **Add new site → Import an existing project**.
3. Connect your repository.
4. Netlify auto-detects settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**.

### Option B: Manual Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Build the project
npm run build

# Deploy (first time will prompt for site setup)
netlify deploy --prod --dir=dist
```

### Option C: Drag & Drop

1. Run `npm run build`.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag the `dist/` folder onto the page.

## Environment Variables

| Variable | Values | Description |
|----------|--------|-------------|
| `VITE_VISUAL_PHASE` | `1` or `2` | **Phase 2** (default): unified green plexus network background + clickable image lightbox. **Phase 1**: original multi-layer purple/cyan 3D visuals. |

Copy `.env.example` to `.env` and set `VITE_VISUAL_PHASE=1` to revert to Phase 1.

```bash
cp .env.example .env
# Edit .env to switch phases, then restart dev server
```

No other environment variables are required. All assets are bundled locally.

## License

Educational project for ITAI 1370.
