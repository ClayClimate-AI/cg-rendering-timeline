import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { SceneLights, ParticleField } from './shared'

function TimelineSpine() {
  const groupRef = useRef()
  const nodeCount = 8

  const nodes = useMemo(
    () =>
      Array.from({ length: nodeCount }, (_, i) => ({
        y: 6 - i * 1.7,
        color: ['#22d3ee', '#6366f1', '#818cf8', '#e879f9', '#f472b6', '#fbbf24', '#34d399', '#22d3ee'][i],
        size: 0.12 + (i % 3) * 0.04,
      })),
    [],
  )

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15
  })

  return (
    <group ref={groupRef}>
      <Line
        points={nodes.map((n) => [0, n.y, 0])}
        color="#6366f1"
        lineWidth={2}
        transparent
        opacity={0.6}
      />

      {nodes.map((node, i) => (
        <group key={i} position={[0, node.y, 0]}>
          <mesh>
            <sphereGeometry args={[node.size, 16, 16]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.8}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[node.size * 2.5, 0.01, 8, 32]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {nodes.map((node, i) => {
        const side = i % 2 === 0 ? -1 : 1
        return (
          <Line
            key={`branch-${i}`}
            points={[
              [0, node.y, 0],
              [side * 2.5, node.y + 0.2, 0.5],
            ]}
            color={node.color}
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        )
      })}
    </group>
  )
}

function OrbitingShapes() {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
  })

  return (
    <group ref={groupRef}>
      <mesh position={[5, 2, -2]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#6366f1" wireframe emissive="#6366f1" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-5, -1, -1]}>
        <octahedronGeometry args={[0.35]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} transparent opacity={0.7} />
      </mesh>
      <mesh position={[4.5, -4, -3]}>
        <icosahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#e879f9" wireframe emissive="#e879f9" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-4, 4, -2]}>
        <torusGeometry args={[0.3, 0.1, 12, 24]} />
        <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function TimelineContent() {
  return (
    <>
      <SceneLights intensity={0.7} />
      <ParticleField count={300} spread={20} size={0.025} color="#818cf8" />
      <TimelineSpine />
      <OrbitingShapes />
    </>
  )
}

export default function TimelineScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        dpr={[1, 1.25]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <TimelineContent />
      </Canvas>
    </div>
  )
}
