import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { SceneLights, ParticleField } from './shared'

function MorphingCluster() {
  const meshRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2
      meshRef.current.rotation.y = t * 0.3
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5) * 0.2
    }
  })

  return (
    <group position={[3, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef}>
        <torusGeometry args={[2, 0.03, 16, 64]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} />
      </mesh>

      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.02, 12, 48]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

function LeftCluster() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.25
  })

  return (
    <group ref={groupRef} position={[-3.5, 1, -1]}>
      <mesh>
        <dodecahedronGeometry args={[0.6]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, 0, 0]} scale={1.8}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial color="#818cf8" wireframe transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

function AnalysisContent() {
  return (
    <>
      <SceneLights intensity={0.6} />
      <ParticleField count={200} spread={15} size={0.02} color="#e879f9" />
      <MorphingCluster />
      <LeftCluster />
    </>
  )
}

export default function AnalysisScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <AnalysisContent />
      </Canvas>
    </div>
  )
}
