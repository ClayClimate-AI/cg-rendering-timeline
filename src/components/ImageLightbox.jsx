import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ImageLightbox({ milestone, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ perspective: 1200 }}
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.55,
          rotateX: 18,
          z: -400,
          y: 60,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotateX: 0,
          z: 0,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.55,
          rotateX: 18,
          z: -400,
          y: 60,
        }}
        transition={{
          duration: 0.85,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-5xl"
        style={{ transformStyle: 'preserve-3d' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="overflow-hidden rounded-2xl border border-[#3dff7a]/30 shadow-2xl"
          style={{
            boxShadow:
              '0 0 60px rgba(61, 255, 122, 0.25), 0 25px 80px rgba(0, 0, 0, 0.6)',
          }}
        >
          <img
            src={milestone.image}
            alt={`AI-generated illustration: ${milestone.title}`}
            className="max-h-[75vh] w-full object-contain bg-black"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-5 text-center"
        >
          <p className="text-sm font-medium tracking-widest text-[#3dff7a] uppercase">
            {milestone.year} · {milestone.tag}
          </p>
          <h3
            className="font-display mt-1 text-xl font-bold text-white sm:text-2xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {milestone.title}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
            {milestone.description}
          </p>
        </motion.div>

        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/80 backdrop-blur-sm transition-colors hover:border-[#3dff7a]/50 hover:text-[#3dff7a]"
          aria-label="Close image"
        >
          ✕
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 text-xs tracking-widest text-white/40 uppercase"
      >
        Click anywhere or press Esc to close
      </motion.p>
    </motion.div>
  )
}
