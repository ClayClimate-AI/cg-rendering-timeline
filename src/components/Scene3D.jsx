import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  SceneLights,
  FloatingShape,
  ParticleField,
  Starfield,
  WireGrid,
  RayBeams,
} from './three/shared'

function HeroContent() {
  const ringRef = useRef()

  useFrame((state) => {
    if (!ringRef.current) return
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.1
  })

  return (
    <>
      <SceneLights />
      <Starfield />
      <ParticleField count={1000} />
      <WireGrid />
      <RayBeams />

      <mesh ref={ringRef} position={[0, 0, -2]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.4} />
      </mesh>

      <FloatingShape
        position={[-3, 1.5, -2]}
        geometry={<icosahedronGeometry args={[0.8, 0]} />}
        color="#6366f1"
        speed={0.8}
      />
      <FloatingShape
        position={[3.5, -0.5, -3]}
        geometry={<torusKnotGeometry args={[0.5, 0.15, 100, 16]} />}
        color="#22d3ee"
        speed={1.2}
      />
      <FloatingShape
        position={[0, 2, -4]}
        geometry={<octahedronGeometry args={[0.6]} />}
        color="#e879f9"
        speed={1}
      />
      <FloatingShape
        position={[-2, -2, -1]}
        geometry={<boxGeometry args={[0.7, 0.7, 0.7]} />}
        color="#818cf8"
        speed={0.6}
      />
      <FloatingShape
        position={[4, 2.5, -5]}
        geometry={<dodecahedronGeometry args={[0.5]} />}
        color="#f472b6"
        speed={0.9}
        wireframe
      />
      <FloatingShape
        position={[-4.5, -1, -4]}
        geometry={<torusGeometry args={[0.6, 0.2, 16, 32]} />}
        color="#34d399"
        speed={0.7}
      />
      <FloatingShape
        position={[1.5, -3, -2]}
        geometry={<coneGeometry args={[0.5, 1, 8]} />}
        color="#fbbf24"
        speed={1.1}
        wireframe
      />
    </>
  )
}

export default function Scene3D({ className = '' }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <HeroContent />
      </Canvas>
    </div>
  )
}
