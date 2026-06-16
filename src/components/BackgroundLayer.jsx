import AmbientBackground from './three/AmbientBackground'
import PlexusBackground from './three/PlexusBackground'
import { isPhase2 } from '../config/phase'

export default function BackgroundLayer() {
  return isPhase2 ? <PlexusBackground /> : <AmbientBackground />
}
