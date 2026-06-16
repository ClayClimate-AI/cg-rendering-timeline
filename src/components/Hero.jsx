import { motion } from 'framer-motion'
import Scene3D from './Scene3D'
import { isPhase2 } from '../config/phase'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20 pb-16">
      {!isPhase2 && <Scene3D />}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isPhase2
            ? 'bg-linear-to-b from-black/40 via-transparent to-black/60'
            : 'bg-linear-to-b from-void/20 via-transparent to-void'
        }`}
      />
      {!isPhase2 && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-void)_75%)]" />
      )}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-4 text-sm font-medium tracking-[0.3em] uppercase ${
            isPhase2 ? 'text-[#3dff7a]' : 'text-cyan'
          }`}
        >
          ITAI 1370 · Lab L04
          {isPhase2 && (
            <span className="ml-2 text-white/30">· Phase 2</span>
          )}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl leading-tight font-bold tracking-tight sm:text-5xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          The Evolution of{' '}
          <span className={isPhase2 ? 'text-[#3dff7a]' : 'text-gradient'}>
            Computer Graphics
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
        >
          An interactive journey through eight breakthrough moments that
          transformed how we create and experience digital images — from the
          first sketch on a screen to real-time cinematic lighting in games.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#timeline"
            className={`pointer-events-auto rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 ${
              isPhase2
                ? 'bg-[#1a8f4a] shadow-[#3dff7a]/20 hover:bg-[#3dff7a] hover:shadow-[#3dff7a]/40'
                : 'bg-accent shadow-accent/30 hover:bg-glow hover:shadow-glow/40'
            }`}
          >
            Explore the Timeline
          </a>
          <a
            href="#analysis"
            className="pointer-events-auto rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:bg-white/5"
          >
            Read the Analysis
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest text-white/40 uppercase">
            Scroll to begin
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="h-8 w-5 rounded-full border border-white/30 p-1"
          >
            <div className="mx-auto h-2 w-1 rounded-full bg-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
