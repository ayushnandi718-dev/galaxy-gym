import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function UltraGoldMat({ roughness = 0.03 }) {
  return (
    <meshPhysicalMaterial
      color="#D4A843"
      metalness={1.0}
      roughness={roughness}
      reflectivity={1}
      clearcoat={0.8}
      clearcoatRoughness={0.04}
      envMapIntensity={6}
      anisotropy={0.9}
    />
  )
}

function GlossBlackMat() {
  return (
    <meshPhysicalMaterial
      color="#060606"
      metalness={0.1}
      roughness={0.04}
      clearcoat={1}
      clearcoatRoughness={0.02}
      reflectivity={1}
      envMapIntensity={5}
    />
  )
}

function AluminumMat() {
  return (
    <meshPhysicalMaterial
      color="#B8B8C4"
      metalness={1.0}
      roughness={0.08}
      reflectivity={1}
      clearcoat={0.4}
      clearcoatRoughness={0.1}
      envMapIntensity={5}
      anisotropy={0.95}
      anisotropyRotation={0}
    />
  )
}

function OledMat({ color, intensity = 0.9 }) {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={color}
      emissiveIntensity={intensity}
      metalness={0}
      roughness={0}
      clearcoat={1}
      clearcoatRoughness={0}
    />
  )
}

function PhoneBody() {
  const w = 0.58, h = 1.18, d = 0.075, r = 0.12
  return (
    <>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <AluminumMat />
      </mesh>
      {/* Rounded corners - use capsules */}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sy], i) => (
        <mesh key={i} position={[sx * (w / 2 - r), sy * (h / 2 - r), 0]} castShadow>
          <cylinderGeometry args={[r, r, d, 24]} />
          <AluminumMat />
        </mesh>
      ))}
      {/* Edge fillets */}
      {[
        [0, h / 2 - r, 0, [0, 0, 0]],
        [0, -(h / 2 - r), 0, [0, 0, 0]],
        [w / 2 - r, 0, 0, [0, Math.PI / 2, 0]],
        [-(w / 2 - r), 0, 0, [0, Math.PI / 2, 0]],
      ].map(([x, y, z, rot], i) => (
        <mesh key={i} position={[x, y, 0]} rotation={rot} castShadow>
          <cylinderGeometry args={[r, r, i < 2 ? w - r * 2 : h - r * 2, 16]} />
          <AluminumMat />
        </mesh>
      ))}

      {/* Screen (OLED) */}
      <mesh position={[0, 0.02, d / 2 + 0.001]}>
        <boxGeometry args={[w * 0.88, h * 0.82, 0.002]} />
        <OledMat color="#0A1A35" intensity={0.4} />
      </mesh>
      {/* Screen glow */}
      <pointLight color="#2244AA" intensity={0.6} distance={0.8} position={[0, 0.02, d / 2 + 0.05]} />

      {/* Map UI on screen */}
      {/* Road lines */}
      <mesh position={[0.08, -0.05, d / 2 + 0.003]}>
        <boxGeometry args={[0.01, 0.48, 0.002]} />
        <OledMat color="#1A3A1A" intensity={0.5} />
      </mesh>
      <mesh position={[-0.04, 0.12, d / 2 + 0.003]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.01, 0.35, 0.002]} />
        <OledMat color="#1A3A1A" intensity={0.5} />
      </mesh>
      {/* Route highlight */}
      <mesh position={[0.035, 0.04, d / 2 + 0.004]} rotation={[0, 0, 0.22]}>
        <boxGeometry args={[0.028, 0.38, 0.002]} />
        <OledMat color="#2244DD" intensity={0.7} />
      </mesh>

      {/* Notch / dynamic island */}
      <mesh position={[0, h / 2 * 0.82, d / 2 + 0.002]}>
        <capsuleGeometry args={[0.035, 0.09, 8, 16]} />
        <GlossBlackMat />
      </mesh>

      {/* Camera bump (back) */}
      <mesh position={[-0.14, 0.38, -(d / 2 + 0.015)]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.025]} />
        <AluminumMat />
      </mesh>
      {/* Camera lenses */}
      {[[-0.07, 0.07], [0.07, 0.07], [-0.07, -0.05], [0.07, -0.05]].map(([cx, cy], i) => (
        <mesh key={i} position={[-0.14 + cx, 0.38 + cy, -(d / 2 + 0.026)]}>
          <cylinderGeometry args={[0.04, 0.04, 0.01, 20]} />
          <GlossBlackMat />
        </mesh>
      ))}
      {/* Camera glass */}
      {[[-0.07, 0.07], [0.07, 0.07], [-0.07, -0.05]].map(([cx, cy], i) => (
        <mesh key={i} position={[-0.14 + cx, 0.38 + cy, -(d / 2 + 0.028)]}>
          <cylinderGeometry args={[0.032, 0.032, 0.006, 20]} />
          <meshPhysicalMaterial color="#110022" metalness={0} roughness={0} transmission={0.5} clearcoat={1} clearcoatRoughness={0} ior={1.5} />
        </mesh>
      ))}
      {/* LED flash */}
      <mesh position={[0, 0.38 - 0.05, -(d / 2 + 0.028)]}>
        <cylinderGeometry args={[0.018, 0.018, 0.004, 12]} />
        <meshPhysicalMaterial color="#FFFAEE" emissive="#FFFAEE" emissiveIntensity={0.3} metalness={0} roughness={0} />
      </mesh>

      {/* Side buttons */}
      <mesh position={[w / 2 + 0.004, 0.32, 0]} castShadow>
        <boxGeometry args={[0.012, 0.09, 0.058]} />
        <AluminumMat />
      </mesh>
      <mesh position={[w / 2 + 0.004, 0.14, 0]} castShadow>
        <boxGeometry args={[0.012, 0.062, 0.052]} />
        <AluminumMat />
      </mesh>
      <mesh position={[-(w / 2 + 0.004), 0.22, 0]} castShadow>
        <boxGeometry args={[0.012, 0.055, 0.05]} />
        <AluminumMat />
      </mesh>
    </>
  )
}

export default function PhoneLocationModel() {
  const groupRef = useRef()
  const pinRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const physRef = useRef({ ry: 0, py: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    physRef.current.ry += 0.33 * delta
    const targetPy = Math.sin(t * 0.6) * 0.1
    physRef.current.py += (targetPy - physRef.current.py) * 0.05

    groupRef.current.rotation.y = physRef.current.ry
    groupRef.current.position.y = physRef.current.py

    // Pin bounce - squash and stretch
    if (pinRef.current) {
      const bounce = Math.abs(Math.sin(t * 1.3))
      pinRef.current.position.y = 0.72 + bounce * 0.22
      const squash = 1 + Math.cos(t * 1.3) * 0.06
      pinRef.current.scale.set(squash, 1 / squash, squash)
    }

    // Radar rings with staggered phase
    ;[ring1Ref, ring2Ref, ring3Ref].forEach((r, i) => {
      if (!r.current) return
      const phase = (t * 1.1 + i * 1.15) % 3.45
      const scale = 0.25 + phase * 0.32
      const opacity = Math.max(0, (1 - phase / 3.45) * 0.65)
      r.current.scale.setScalar(scale)
      r.current.material.opacity = opacity
    })
  })

  return (
    <group ref={groupRef} scale={0.88}>

      {/* === MAP BASE PLATFORM === */}
      <mesh castShadow receiveShadow position={[0, -1.05, 0]}>
        <boxGeometry args={[2.2, 0.06, 1.65]} />
        <meshPhysicalMaterial color="#0A140A" metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Map gold border frame */}
      {[
        [0, 0, -0.845, [0, 0, 0], [2.24, 0.065, 0.025]],
        [0, 0, 0.845, [0, 0, 0], [2.24, 0.065, 0.025]],
        [-1.125, 0, 0, [0, 0, 0], [0.025, 0.065, 1.65]],
        [1.125, 0, 0, [0, 0, 0], [0.025, 0.065, 1.65]],
      ].map(([x, y, z, rot, size], i) => (
        <mesh key={i} position={[x, -1.02, z]} rotation={rot} castShadow>
          <boxGeometry args={size} />
          <UltraGoldMat roughness={0.04} />
        </mesh>
      ))}
      {/* Corner gold studs */}
      {[[-1.06, -0.82], [1.06, -0.82], [-1.06, 0.82], [1.06, 0.82]].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.0, z]} castShadow>
          <sphereGeometry args={[0.042, 12, 12]} />
          <UltraGoldMat roughness={0.03} />
        </mesh>
      ))}

      {/* === MAP GRID LINES === */}
      {[-0.55, 0, 0.55].map((x, i) => (
        <mesh key={`v${i}`} position={[x, -1.02, 0]}>
          <boxGeometry args={[0.009, 0.01, 1.56]} />
          <meshStandardMaterial color="#D4A843" opacity={0.22} transparent />
        </mesh>
      ))}
      {[-0.52, 0, 0.52].map((z, i) => (
        <mesh key={`h${i}`} position={[0, -1.02, z]}>
          <boxGeometry args={[2.1, 0.01, 0.009]} />
          <meshStandardMaterial color="#D4A843" opacity={0.22} transparent />
        </mesh>
      ))}
      {/* Road blocks */}
      {[[-0.3, 0.18], [0.15, -0.3], [-0.4, -0.1]].map(([x, z], i) => (
        <mesh key={i} position={[x, -1.018, z]}>
          <boxGeometry args={[0.22 + i * 0.08, 0.008, 0.12 + i * 0.05]} />
          <meshStandardMaterial color="#1A2A1A" opacity={0.7} transparent />
        </mesh>
      ))}

      {/* === LOCATION PIN === */}
      <group ref={pinRef} position={[0, 0.72, 0]}>
        {/* Teardrop sphere */}
        <mesh castShadow position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial
            color="#FF2222"
            metalness={0.2}
            roughness={0.12}
            clearcoat={1}
            clearcoatRoughness={0.05}
            emissive="#FF0000"
            emissiveIntensity={0.25}
            envMapIntensity={4}
          />
        </mesh>
        {/* Pin hole (inner dark sphere) */}
        <mesh position={[0, 0.32, 0.25]}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* Pin shine highlight */}
        <mesh position={[-0.08, 0.43, 0.18]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshPhysicalMaterial color="#FFFFFF" metalness={0} roughness={0} transmission={0.6} />
        </mesh>
        {/* Pin tail */}
        <mesh castShadow position={[0, -0.02, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.11, 0.6, 20]} />
          <meshPhysicalMaterial
            color="#CC1111"
            metalness={0.25}
            roughness={0.22}
            clearcoat={0.7}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Gold ring equator */}
        <mesh position={[0, 0.32, 0]}>
          <torusGeometry args={[0.315, 0.028, 14, 36]} />
          <UltraGoldMat roughness={0.02} />
        </mesh>
        <pointLight color="#FF3333" intensity={2.5} distance={2} position={[0, 0.32, 0]} />
      </group>

      {/* === RADAR RINGS === */}
      {[ring1Ref, ring2Ref, ring3Ref].map((r, i) => (
        <mesh key={i} ref={r} position={[0, -1.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.52, 56]} />
          <meshStandardMaterial color="#D4A843" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* === PHONE (tilted back) === */}
      <group position={[0.55, -0.38, -0.35]} rotation={[-0.22, 0.35, 0.08]}>
        <PhoneBody />
      </group>

      {/* === LIGHTING === */}
      <pointLight color="#D4A843" intensity={3} distance={6} position={[0, 2, 0.5]} />
      <pointLight color="#FF2222" intensity={2} distance={3} position={[0, 1.2, 0.5]} />
      <pointLight color="#FFFFFF" intensity={2.5} distance={5} position={[1.5, 1, 2]} />
      <pointLight color="#4488FF" intensity={1.5} distance={4} position={[-1.5, 0, -1]} />
      <spotLight position={[2, 5, 3]} angle={0.25} penumbra={0.6} intensity={5} color="#FFF5EE" castShadow />
    </group>
  )
}