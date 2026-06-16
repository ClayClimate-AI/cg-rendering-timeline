const techIcons = [
  {
    name: 'React',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <circle cx="12" cy="12" r="2.139" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="currentColor" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: 'Vite',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M21 3L13.5 17.5L11 12L7 15L3 3h18z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M11 12L13.5 17.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path
          d="M12 6C9.6 6 8.1 7.2 7.5 9.6 8.4 8.4 9.45 7.95 10.65 8.25 11.34 8.43 11.83 8.93 12.38 9.48 13.27 10.39 14.31 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.69-.18-1.18-.68-1.73-1.23C15.23 7.01 14.19 6 12 6zm-4.5 5.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.69.18 1.18.68 1.73 1.23C8.77 15.99 9.81 17 12 17c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.69-.18-1.18-.68-1.73-1.23C10.73 12.41 9.69 11.4 7.5 11.4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: 'Three.js',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
        <path d="M12 2L22 20H2L12 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M7 14l5-9 5 9" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <line x1="7" y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-green-900/40 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p
            className="font-display text-lg font-bold"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            CG Rendering Timeline
          </p>
          <p className="mt-1 text-sm text-white/50">
            Lab L04 · ITAI 1370 · Explore Generative AI for Visualizing
            Rendering History
          </p>
        </div>
        <div className="flex items-center gap-4">
          {techIcons.map(({ name, svg }) => (
            <div
              key={name}
              title={name}
              className="text-green-500/60 transition-colors hover:text-green-400"
            >
              {svg}
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
