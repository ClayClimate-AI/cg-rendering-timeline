import { milestones } from '../data/milestones'
import MilestoneCard from './MilestoneCard'
import TimelineScene from './three/TimelineScene'
import { motion } from 'framer-motion'
import { isPhase2 } from '../config/phase'

export default function Timeline() {
  return (
    <section id="timeline" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {!isPhase2 && <TimelineScene />}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isPhase2
            ? 'bg-linear-to-b from-black/20 via-transparent to-black/30'
            : 'bg-linear-to-b from-void/60 via-transparent to-void/60'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className={`mb-3 text-sm font-medium tracking-[0.25em] uppercase ${
              isPhase2 ? 'text-[#6bffb0]' : 'text-magenta'
            }`}
          >
            1963 — 2018
          </p>
          <h2
            className="font-display text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Milestones in{' '}
            <span className={isPhase2 ? 'text-[#3dff7a]' : 'text-gradient'}>
              Rendering History
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            Eight game-changing innovations that shaped how computers draw the
            world — click any image to view it up close.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className={`absolute top-0 left-1/2 hidden h-full w-px -translate-x-1/2 md:block ${
              isPhase2 ? 'bg-[#3dff7a]/30' : 'glow-line'
            }`}
          />

          <div className="flex flex-col gap-12 md:gap-20">
            {milestones.map((milestone, index) => (
              <div key={milestone.id} className="relative">
                <div className="absolute top-8 left-1/2 z-20 hidden -translate-x-1/2 md:block">
                  <div className="relative h-5 w-5">
                    <div
                      className={`absolute inset-0 animate-ping rounded-full ${
                        isPhase2 ? 'bg-[#3dff7a]/40' : 'bg-cyan/40'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 rounded-full border-2 bg-black shadow-lg ${
                        isPhase2
                          ? 'border-[#3dff7a] shadow-[#3dff7a]/60'
                          : 'border-cyan shadow-cyan/60'
                      }`}
                    />
                    <div
                      className={`absolute inset-1 rounded-full ${
                        isPhase2 ? 'bg-[#3dff7a]/80' : 'bg-cyan/80'
                      }`}
                    />
                  </div>
                </div>
                <MilestoneCard
                  milestone={milestone}
                  index={index}
                  isEven={index % 2 === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
