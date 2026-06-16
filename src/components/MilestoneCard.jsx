import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import MilestoneBadge3D from './three/MilestoneBadge3D'
import ImageLightbox from './ImageLightbox'
import { isPhase2 } from '../config/phase'

function use3DTilt() {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

export default function MilestoneCard({ milestone, index, isEven }) {
  const [isHovered, setIsHovered] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <>
      <motion.article
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`relative flex w-full flex-col gap-6 md:w-[calc(50%-2rem)] ${
          isEven ? 'md:ml-auto' : 'md:mr-auto'
        }`}
        style={{ perspective: 1200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          handleMouseLeave()
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          ref={ref}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className={`glass group overflow-hidden rounded-2xl transition-shadow duration-500 ${
            isHovered
              ? isPhase2
                ? 'border-[#3dff7a]/40 shadow-2xl shadow-[#3dff7a]/15'
                : 'border-accent/40 shadow-2xl shadow-accent/20'
              : 'hover:border-white/20'
          }`}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="relative block aspect-video w-full cursor-zoom-in overflow-hidden text-left"
            aria-label={`View full image: ${milestone.title}`}
          >
            <motion.img
              src={milestone.image}
              alt={`AI-generated illustration: ${milestone.title}`}
              className="h-full w-full object-cover"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-void/80 via-transparent to-transparent" />

            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`pointer-events-none absolute inset-0 ${
                  isPhase2
                    ? 'bg-linear-to-br from-[#3dff7a]/10 via-transparent to-[#1a8f4a]/10'
                    : 'bg-linear-to-br from-cyan/10 via-transparent to-magenta/10'
                }`}
              />
            )}

            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm ${
                isPhase2
                  ? 'border border-[#3dff7a]/30 bg-black/60 text-[#3dff7a]'
                  : 'bg-accent/90 text-white'
              }`}
            >
              Click to view up close
            </motion.span>

            <span className="absolute top-4 left-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
              {milestone.tag}
            </span>
          </button>

          <div className="p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-4">
              {!isPhase2 && (
                <MilestoneBadge3D type={milestone.id} hovered={isHovered} />
              )}
              <div className="flex items-baseline gap-3">
                <span
                  className={`font-display text-3xl font-bold ${isPhase2 ? 'text-[#3dff7a]' : 'text-cyan'}`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {milestone.year}
                </span>
                <span className="text-xs text-white/40">#{index + 1}</span>
              </div>
            </div>

            <h3
              className="font-display mb-3 text-xl font-bold text-white sm:text-2xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {milestone.title}
            </h3>

            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              {milestone.description}
            </p>
          </div>
        </motion.div>
      </motion.article>

      <AnimatePresence>
        {lightboxOpen && (
          <ImageLightbox
            milestone={milestone}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
