import { motion } from 'framer-motion'
import { analysisContent } from '../data/milestones'
import AnalysisScene from './three/AnalysisScene'
import { isPhase2 } from '../config/phase'

export default function Analysis() {
  return (
    <section id="analysis" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {!isPhase2 && <AnalysisScene />}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isPhase2
            ? 'bg-linear-to-b from-black/20 via-[#3dff7a]/3 to-black/40'
            : 'bg-linear-to-b from-void/50 via-accent/5 to-void/70'
        }`}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p
            className={`mb-3 text-sm font-medium tracking-[0.25em] uppercase ${
              isPhase2 ? 'text-[#3dff7a]' : 'text-cyan'
            }`}
          >
            Reflection
          </p>
          <h2
            className="font-display text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {analysisContent.title}
          </h2>
        </motion.div>

        <div className="space-y-8">
          {analysisContent.sections.map((section, i) => (
            <motion.div
              key={section.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`rounded-2xl p-6 backdrop-blur-md sm:p-8 ${
                isPhase2
                  ? 'border border-[#3dff7a]/15 bg-black/50'
                  : 'glass'
              }`}
            >
              <h3
                className={`font-display mb-4 text-xl font-bold ${
                  isPhase2 ? 'text-[#6bffb0]' : 'text-glow'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {section.heading}
              </h3>

              {section.points ? (
                <ul className="space-y-3">
                  {section.points.map((point) => (
                    <li
                      key={point.slice(0, 40)}
                      className="flex gap-3 text-sm leading-relaxed text-white/70 sm:text-base"
                    >
                      <span
                        className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full shadow-sm ${
                          isPhase2
                            ? 'bg-[#3dff7a] shadow-[#3dff7a]/50'
                            : 'bg-cyan shadow-cyan/50'
                        }`}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                  {section.body}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
