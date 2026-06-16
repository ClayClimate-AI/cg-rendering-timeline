import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 160
const CONNECT_DIST = 2.1
const MAX_LINES = 500
const GREEN = '#3dff7a'
const GREEN_BRIGHT = '#6bffb0'
const GREEN_DIM = '#1a8f4a'

function useMousePosition() {
  const mouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return mouse
}

function PlexusNetwork() {
  const pointsRef = useRef()
  const linesRef = useRef()
  const mouse = useMousePosition()
  const { camera } = useThree()

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12 - 3,
      ),
      base: new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 12 - 3,
      ),
      phase: Math.random() * Math.PI * 2,
      speed: 0.15 + Math.random() * 0.25,
    }))
  }, [])

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = particles[i].pos
      arr[i * 3] = p.x
      arr[i * 3 + 1] = p.y
      arr[i * 3 + 2] = p.z
    }
    return arr
  }, [particles])

  const linePositions = useMemo(
    () => new Float32Array(MAX_LINES * 6),
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const mouseWorld = new THREE.Vector3(
      mouse.current.x * 10,
      mouse.current.y * 7,
      2,
    )

    particles.forEach((p, i) => {
      const dx = p.base.x + Math.sin(t * p.speed + p.phase) * 0.6
      const dy = p.base.y + Math.cos(t * p.speed * 0.8 + p.phase) * 0.5
      const dz = p.base.z + Math.sin(t * p.speed * 0.5 + p.phase) * 0.3

      p.pos.set(dx, dy, dz)

      const toMouse = p.pos.clone().sub(mouseWorld)
      const dist = toMouse.length()
      if (dist < 4) {
        p.pos.add(toMouse.normalize().multiplyScalar((4 - dist) * 0.008))
      }

      pointPositions[i * 3] = p.pos.x
      pointPositions[i * 3 + 1] = p.pos.y
      pointPositions[i * 3 + 2] = p.pos.z
    })

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }

    let lineIndex = 0
    for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_LINES; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_LINES; j++) {
        const dist = particles[i].pos.distanceTo(particles[j].pos)
        if (dist < CONNECT_DIST) {
          const alpha = 1 - dist / CONNECT_DIST
          const idx = lineIndex * 6
          linePositions[idx] = particles[i].pos.x
          linePositions[idx + 1] = particles[i].pos.y
          linePositions[idx + 2] = particles[i].pos.z
          linePositions[idx + 3] = particles[j].pos.x
          linePositions[idx + 4] = particles[j].pos.y
          linePositions[idx + 5] = particles[j].pos.z
          lineIndex++
        }
      }
    }

    if (linesRef.current) {
      const geom = linesRef.current.geometry
      geom.setDrawRange(0, lineIndex * 2)
      geom.attributes.position.needsUpdate = true
    }

    const scroll =
      window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)
    camera.position.y = -scroll * 3
    camera.position.x = Math.sin(t * 0.05) * 0.3
    camera.lookAt(0, -scroll * 3, 0)
  })

  return (
    <group>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={MAX_LINES * 2}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={GREEN}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[pointPositions, 3]}
            count={PARTICLE_COUNT}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color={GREEN_BRIGHT}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}

function WireSpiral() {
  const groupRef = useRef()

  const { lineGeo, fillGeo } = useMemo(() => {
    const spiralPoints = []
    const fillVerts = []
    const fillIdx = []

    for (let i = 0; i < 120; i++) {
      const t = i / 20
      const angle = t * Math.PI * 1.8
      const r = 0.3 + t * 0.35
      spiralPoints.push(
        new THREE.Vector3(
          Math.cos(angle) * r,
          Math.sin(angle) * r * 0.7,
          Math.sin(t) * 0.2,
        ),
      )
    }

    for (let i = 0; i < spiralPoints.length - 2; i++) {
      const a = spiralPoints[i]
      const b = spiralPoints[i + 1]
      const c = spiralPoints[i + 2]
      const base = fillVerts.length / 3
      fillVerts.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z)
      fillIdx.push(base, base + 1, base + 2)
    }

    const linePositions = new Float32Array(spiralPoints.length * 3)
    spiralPoints.forEach((p, i) => {
      linePositions[i * 3] = p.x
      linePositions[i * 3 + 1] = p.y
      linePositions[i * 3 + 2] = p.z
    })

    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const fillGeo = new THREE.BufferGeometry()
    fillGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(fillVerts), 3))
    fillGeo.setIndex(fillIdx)

    return { lineGeo, fillGeo }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.08
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2
  })

  return (
    <group ref={groupRef} position={[5.5, 0, -2]} scale={1.8}>
      <line geometry={lineGeo}>
        <lineBasicMaterial color={GREEN_BRIGHT} transparent opacity={0.7} />
      </line>
      <mesh geometry={fillGeo}>
        <meshBasicMaterial
          color={GREEN}
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.2, Math.sin(angle) * 0.8, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color={GREEN_BRIGHT} transparent opacity={0.8} />
          </mesh>
        )
      })}
    </group>
  )
}

function BokehOrbs() {
  const orbs = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
        position: [
          (Math.random() - 0.5) * 24,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 8 - 6,
        ],
        size: 0.15 + Math.random() * 0.4,
        opacity: 0.05 + Math.random() * 0.12,
        color: Math.random() > 0.7 ? '#88ccff' : GREEN_DIM,
      })),
    [],
  )

  return (
    <group>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position}>
          <sphereGeometry args={[orb.size, 12, 12]} />
          <meshBasicMaterial
            color={orb.color}
            transparent
            opacity={orb.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function PlexusScene() {
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 8, 28]} />
      <ambientLight intensity={0.15} />
      <PlexusNetwork />
      <WireSpiral />
      <BokehOrbs />
    </>
  )
}

export default function PlexusBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55 }}
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        style={{ background: '#000000' }}
      >
        <PlexusScene />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(61,255,122,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />
    </div>
  )
}
