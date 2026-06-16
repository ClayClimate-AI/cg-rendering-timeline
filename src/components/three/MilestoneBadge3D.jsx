import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { MilestoneGeometry, MILESTONE_COLORS } from './shared'

function BadgeScene({ type, hovered }) {
  const color = MILESTONE_COLORS[type] || '#6366f1'

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={0.5} color="#22d3ee" />
      <MilestoneGeometry type={type} color={color} hovered={hovered} />
    </>
  )
}

export default function MilestoneBadge3D({ type, hovered = false, className = '' }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1, rootMargin: '50px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-void/60 sm:h-16 sm:w-16 ${className}`}
    >
      {visible && (
        <Canvas
          camera={{ position: [0, 0, 2.2], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <BadgeScene type={type} hovered={hovered} />
        </Canvas>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5" />
    </div>
  )
}
