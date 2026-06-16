/**
 * Visual phase toggle
 * - Phase 1: Multi-layer 3D (hero, timeline, analysis section canvases)
 * - Phase 2: Unified green plexus network background + image lightbox
 *
 * Set VITE_VISUAL_PHASE=1 in .env to revert to Phase 1
 */
export const VISUAL_PHASE = Number(import.meta.env.VITE_VISUAL_PHASE ?? 2)
export const isPhase2 = VISUAL_PHASE === 2
