import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars, Grid, Line } from '@react-three/drei'
import * as THREE from 'three'

export function SceneLights({ intensity = 1 }) {
  return (
    <>
      <ambientLight intensity={0.25 * intensity} />
      <pointLight position={[10, 10, 10]} intensity={1.2 * intensity} color="#22d3ee" />
      <pointLight position={[-8, -4, 5]} intensity={0.8 * intensity} color="#e879f9" />
      <pointLight position={[0, -6, 4]} intensity={0.5 * intensity} color="#6366f1" />
    </>
  )
}

export function FloatingShape({ position, geometry, color, speed = 1, scale = 1, wireframe = false }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 * speed
  })

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={wireframe ? 0.6 : 0.35}
          metalness={wireframe ? 0.2 : 0.6}
          roughness={wireframe ? 0.8 : 0.3}
          transparent
          opacity={wireframe ? 0.5 : 0.75}
          wireframe={wireframe}
        />
      </mesh>
    </Float>
  )
}

export function ParticleField({ count = 800, spread = 30, color = '#818cf8', size = 0.04 }) {
  const pointsRef = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.7
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5 - 5
    }
    return pos
  }, [count, spread])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export function WireGrid({ y = -4, size = 40 }) {
  return (
    <Grid
      position={[0, y, 0]}
      args={[size, size]}
      cellSize={1}
      cellThickness={0.4}
      cellColor="#6366f1"
      sectionSize={5}
      sectionThickness={0.8}
      sectionColor="#22d3ee"
      fadeDistance={35}
      fadeStrength={1.5}
      infiniteGrid
    />
  )
}

export function RayBeams() {
  const groupRef = useRef()

  const beams = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        angle: (i / 6) * Math.PI * 2,
        length: 4 + Math.random() * 3,
        color: i % 2 === 0 ? '#22d3ee' : '#e879f9',
      })),
    [],
  )

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <group ref={groupRef} position={[0, 0, -3]}>
      {beams.map((beam, i) => {
        const x = Math.cos(beam.angle) * beam.length
        const z = Math.sin(beam.angle) * beam.length
        return (
          <Line
            key={i}
            points={[[0, 0, 0], [x, 0.5, z]]}
            color={beam.color}
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        )
      })}
    </group>
  )
}

export function Starfield({ count = 2000 }) {
  return <Stars radius={50} depth={30} count={count} factor={3} fade speed={0.5} />
}

export function ScrollReactiveGroup({ children, intensity = 4 }) {
  const groupRef = useRef()

  useFrame(() => {
    if (!groupRef.current) return
    const scroll =
      window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
    groupRef.current.position.y = scroll * intensity
    groupRef.current.rotation.z = scroll * 0.15
  })

  return <group ref={groupRef}>{children}</group>
}

export function MilestoneGeometry({ type, color = '#6366f1', hovered = false }) {
  const meshRef = useRef()
  const scale = hovered ? 1.15 : 1

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.4
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.6
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
  })

  const geos = {
    sketchpad: <planeGeometry args={[1.2, 0.9]} />,
    gouraud: <sphereGeometry args={[0.55, 16, 16]} />,
    phong: <sphereGeometry args={[0.55, 32, 32]} />,
    raytracing: <icosahedronGeometry args={[0.55, 1]} />,
    renderman: <torusGeometry args={[0.45, 0.15, 16, 32]} />,
    'cgi-film': <boxGeometry args={[0.7, 0.7, 0.7]} />,
    shaders: <octahedronGeometry args={[0.55]} />,
    rtx: <dodecahedronGeometry args={[0.5]} />,
  }

  const materials = {
    sketchpad: { wireframe: true, metalness: 0.1, roughness: 0.9, opacity: 0.7 },
    gouraud: { metalness: 0.3, roughness: 0.5, opacity: 0.85 },
    phong: { metalness: 0.9, roughness: 0.1, opacity: 0.95 },
    raytracing: { wireframe: false, metalness: 0.7, roughness: 0.2, opacity: 0.8 },
    renderman: { metalness: 0.5, roughness: 0.4, opacity: 0.85 },
    'cgi-film': { metalness: 0.4, roughness: 0.5, opacity: 0.85 },
    shaders: { wireframe: true, metalness: 0.3, roughness: 0.6, opacity: 0.75 },
    rtx: { metalness: 0.8, roughness: 0.15, opacity: 0.9 },
  }

  const mat = materials[type] || materials.gouraud

  return (
    <mesh ref={meshRef}>
      {geos[type] || geos.gouraud}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.35}
        metalness={mat.metalness}
        roughness={mat.roughness}
        transparent
        opacity={mat.opacity}
        wireframe={mat.wireframe}
      />
    </mesh>
  )
}

export const MILESTONE_COLORS = {
  sketchpad: '#22d3ee',
  gouraud: '#6366f1',
  phong: '#818cf8',
  raytracing: '#e879f9',
  renderman: '#f472b6',
  'cgi-film': '#fbbf24',
  shaders: '#34d399',
  rtx: '#22d3ee',
}
