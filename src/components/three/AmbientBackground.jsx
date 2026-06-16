import { Canvas } from '@react-three/fiber'
import {
  SceneLights,
  FloatingShape,
  ParticleField,
  Starfield,
  ScrollReactiveGroup,
  WireGrid,
} from './shared'

function AmbientContent() {
  return (
    <>
      <SceneLights intensity={0.6} />
      <Starfield count={1500} />
      <ParticleField count={500} spread={50} size={0.03} />
      <ScrollReactiveGroup intensity={6}>
        <FloatingShape
          position={[-12, 3, -8]}
          geometry={<icosahedronGeometry args={[1.2, 0]} />}
          color="#6366f1"
          speed={0.4}
          scale={1.5}
          wireframe
        />
        <FloatingShape
          position={[14, -2, -10]}
          geometry={<torusKnotGeometry args={[0.8, 0.2, 64, 12]} />}
          color="#22d3ee"
          speed={0.5}
          scale={1.2}
        />
        <FloatingShape
          position={[-10, -8, -6]}
          geometry={<octahedronGeometry args={[1]} />}
          color="#e879f9"
          speed={0.35}
          wireframe
        />
        <FloatingShape
          position={[11, 10, -7]}
          geometry={<dodecahedronGeometry args={[0.9]} />}
          color="#818cf8"
          speed={0.45}
        />
        <FloatingShape
          position={[0, -12, -5]}
          geometry={<torusGeometry args={[1.5, 0.3, 24, 48]} />}
          color="#6366f1"
          speed={0.3}
          wireframe
        />
      </ScrollReactiveGroup>
      <WireGrid y={-15} size={60} />
    </>
  )
}

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <AmbientContent />
      </Canvas>
      <div className="absolute inset-0 bg-void/40" />
    </div>
  )
}
