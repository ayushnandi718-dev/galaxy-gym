import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function GoldMat() {
  return <meshPhysicalMaterial color="#C9A84C" metalness={0.99} roughness={0.02} reflectivity={1} clearcoat={1} envMapIntensity={3} />
}

export default function PhoneLocationModel() {
  const groupRef = useRef()
  const pinRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.35
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.1

    // Pin bounce
    if (pinRef.current) pinRef.current.position.y = 0.9 + Math.abs(Math.sin(t * 1.2)) * 0.18

    // Expanding rings (radar effect)
    ;[ring1Ref, ring2Ref, ring3Ref].forEach((r, i) => {
      if (!r.current) return
      const phase = (t * 1.2 + i * 1.2) % 3.6
      const scale = 0.3 + phase * 0.35
      const opacity = Math.max(0, 1 - phase / 3.6)
      r.current.scale.setScalar(scale)
      r.current.material.opacity = opacity * 0.6
    })
  })

  return (
    <group ref={groupRef} scale={0.85}>
      {/* Map base platform */}
      <mesh castShadow position={[0, -0.85, 0]}>
        <boxGeometry args={[2.0, 0.08, 1.5]} />
        <meshPhysicalMaterial color="#0a1a0a" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Map border */}
      <mesh position={[0, -0.81, 0]}>
        <boxGeometry args={[2.06, 0.04, 1.56]} />
        <GoldMat />
      </mesh>

      {/* Map grid lines */}
      {[-0.5, 0, 0.5].map((x, i) => (
        <mesh key={`v${i}`} position={[x, -0.8, 0]}>
          <boxGeometry args={[0.01, 0.02, 1.4]} />
          <meshStandardMaterial color="#C9A84C" opacity={0.3} transparent />
        </mesh>
      ))}
      {[-0.5, 0, 0.5].map((z, i) => (
        <mesh key={`h${i}`} position={[0, -0.8, z]}>
          <boxGeometry args={[1.9, 0.02, 0.01]} />
          <meshStandardMaterial color="#C9A84C" opacity={0.3} transparent />
        </mesh>
      ))}

      {/* Location pin body */}
      <group ref={pinRef} position={[0, 0.9, 0]}>
        {/* Pin teardrop - top sphere */}
        <mesh castShadow position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshPhysicalMaterial color="#ff3333" metalness={0.3} roughness={0.2} emissive="#ff1111" emissiveIntensity={0.3} />
        </mesh>
        {/* Pin hole */}
        <mesh position={[0, 0.35, 0.22]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Pin tail */}
        <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.1, 0.55, 16]} />
          <meshPhysicalMaterial color="#cc2222" metalness={0.4} roughness={0.3} />
        </mesh>
        {/* Gold ring on pin */}
        <mesh position={[0, 0.35, 0]}>
          <torusGeometry args={[0.3, 0.03, 10, 28]} />
          <GoldMat />
        </mesh>
        <pointLight color="#ff3333" intensity={1.5} distance={2} position={[0, 0.35, 0]} />
      </group>

      {/* Radar rings */}
      {[ring1Ref, ring2Ref, ring3Ref].map((r, i) => (
        <mesh key={i} ref={r} position={[0, -0.79, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.5, 0.56, 40]} />
          <meshStandardMaterial color="#C9A84C" transparent opacity={0.5} side={2} />
        </mesh>
      ))}

      <pointLight color="#C9A84C" intensity={2} distance={5} position={[0, 1, 0]} />
    </group>
  )
}
