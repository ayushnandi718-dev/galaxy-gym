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
      clearcoat={0.7}
      clearcoatRoughness={0.05}
      envMapIntensity={6}
      anisotropy={0.9}
      iridescence={0.1}
      iridescenceIOR={1.85}
    />
  )
}

function GlossBlackMat() {
  return (
    <meshPhysicalMaterial
      color="#0A0A0A"
      metalness={0.15}
      roughness={0.08}
      clearcoat={1}
      clearcoatRoughness={0.04}
      reflectivity={0.9}
      envMapIntensity={4}
    />
  )
}

function MatteBlackMat() {
  return (
    <meshPhysicalMaterial
      color="#111111"
      metalness={0.85}
      roughness={0.28}
      clearcoat={0.1}
      clearcoatRoughness={0.7}
      envMapIntensity={1.5}
    />
  )
}

function OledScreenMat({ color, emissiveIntensity = 0.9 }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.0}
      roughness={0.0}
      clearcoat={1}
      clearcoatRoughness={0.0}
      envMapIntensity={2}
      emissive={color}
      emissiveIntensity={emissiveIntensity}
      transmission={0.1}
    />
  )
}

function GlassMat() {
  return (
    <meshPhysicalMaterial
      color="#88AACC"
      metalness={0.0}
      roughness={0.0}
      transmission={0.82}
      thickness={0.8}
      ior={1.52}
      clearcoat={1}
      clearcoatRoughness={0.0}
      envMapIntensity={5}
    />
  )
}

function DialFace() {
  const numMajor = 12
  const numMinor = 60
  return (
    <>
      {/* Dial glass */}
      <mesh position={[0, 0.062, 0]} castShadow>
        <cylinderGeometry args={[0.52, 0.52, 0.018, 48]} />
        <GlassMat />
      </mesh>

      {/* Tick marks - minor */}
      {Array.from({ length: numMinor }).map((_, i) => {
        const a = (i / numMinor) * Math.PI * 2 - Math.PI / 2
        const isMajor = i % 5 === 0
        const r = 0.44
        const len = isMajor ? 0.065 : 0.032
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * r, 0.055, Math.sin(a) * r]}
            rotation={[0, a + Math.PI / 2, 0]}
          >
            <boxGeometry args={[isMajor ? 0.016 : 0.008, 0.012, len]} />
            <meshPhysicalMaterial
              color={isMajor ? '#D4A843' : '#888888'}
              metalness={isMajor ? 1 : 0.5}
              roughness={isMajor ? 0.02 : 0.4}
              emissive={isMajor ? '#FFD700' : '#444444'}
              emissiveIntensity={isMajor ? 0.15 : 0.05}
            />
          </mesh>
        )
      })}

      {/* Number markers at 12 positions */}
      {Array.from({ length: numMajor }).map((_, i) => {
        const a = (i / numMajor) * Math.PI * 2 - Math.PI / 2
        const r = 0.34
        const val = i === 0 ? 12 : i
        return (
          <mesh key={i} position={[Math.cos(a) * r, 0.056, Math.sin(a) * r]} rotation={[-Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.026, 0.026, 0.006, 10]} />
            <meshPhysicalMaterial color="#D4A843" metalness={1} roughness={0.02} emissive="#FFD700" emissiveIntensity={0.2} />
          </mesh>
        )
      })}
    </>
  )
}

export default function ScaleModel() {
  const groupRef = useRef()
  const needleRef = useRef()
  const physRef = useRef({ ry: 0, py: 0, needleAngle: 0, needleV: 0.3 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    physRef.current.ry += 0.38 * delta
    const targetPy = Math.sin(t * 0.7) * 0.1
    physRef.current.py += (targetPy - physRef.current.py) * 0.05

    // Needle physics - spring + damper
    const targetAngle = Math.sin(t * 0.8) * 0.42 + Math.sin(t * 2.1) * 0.12
    const spring = -1.8 * (physRef.current.needleAngle - targetAngle)
    const damping = -0.15 * physRef.current.needleV
    physRef.current.needleV += (spring + damping) * delta
    physRef.current.needleAngle += physRef.current.needleV * delta

    groupRef.current.rotation.y = physRef.current.ry
    groupRef.current.position.y = physRef.current.py
    if (needleRef.current) needleRef.current.rotation.z = physRef.current.needleAngle
  })

  return (
    <group ref={groupRef} scale={0.88}>

      {/* === BASE === */}
      {/* Main base foot */}
      <mesh castShadow receiveShadow position={[0, -0.88, 0]}>
        <cylinderGeometry args={[0.95, 1.02, 0.1, 56]} />
        <UltraGoldMat roughness={0.06} />
      </mesh>
      {/* Base bevel */}
      <mesh position={[0, -0.84, 0]}>
        <torusGeometry args={[0.96, 0.055, 16, 56]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Gold feet */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4
        return (
          <mesh key={i} position={[Math.cos(a) * 0.8, -0.9, Math.sin(a) * 0.8]} castShadow>
            <cylinderGeometry args={[0.065, 0.05, 0.06, 12]} />
            <UltraGoldMat roughness={0.08} />
          </mesh>
        )
      })}

      {/* === WEIGHING PLATFORM === */}
      {/* Platform glass-top */}
      <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
        <boxGeometry args={[1.58, 0.085, 1.58]} />
        <GlossBlackMat />
      </mesh>
      {/* Platform gold trim corners */}
      {[[-0.75, -0.75], [0.75, -0.75], [-0.75, 0.75], [0.75, 0.75]].map(([x, z], i) => (
        <group key={i} position={[x, -0.26, z]}>
          <mesh castShadow>
            <boxGeometry args={[0.055, 0.09, 0.055]} />
            <UltraGoldMat roughness={0.04} />
          </mesh>
          {/* Screw head */}
          <mesh position={[0, 0.048, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.015, 8]} />
            <meshPhysicalMaterial color="#888888" metalness={1} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Edge trim gold */}
      {[0, 1, 2, 3].map((i) => {
        const angle = i * Math.PI / 2
        const x = Math.cos(angle) * 0.795
        const z = Math.sin(angle) * 0.795
        const rotY = angle + Math.PI / 2
        return (
          <mesh key={i} position={[x, -0.3, z]} rotation={[0, rotY, 0]} castShadow>
            <boxGeometry args={[1.56, 0.09, 0.02]} />
            <UltraGoldMat roughness={0.04} />
          </mesh>
        )
      })}

      {/* === SCALE BODY (center pillar) === */}
      <mesh castShadow position={[0, -0.68, 0]}>
        <cylinderGeometry args={[0.88, 0.92, 0.12, 56]} />
        <MatteBlackMat />
      </mesh>
      <mesh castShadow position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.72, 0.88, 0.22, 56]} />
        <MatteBlackMat />
      </mesh>

      {/* === DIAL ASSEMBLY === */}
      {/* Dial housing */}
      <mesh castShadow position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.58, 0.62, 0.16, 48]} />
        <MatteBlackMat />
      </mesh>
      {/* Dial face */}
      <mesh castShadow position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.565, 0.565, 0.095, 48]} />
        <GlossBlackMat />
      </mesh>
      {/* Dial gold bezel */}
      <mesh position={[0, 0.1, 0]}>
        <torusGeometry args={[0.585, 0.052, 20, 56]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Inner bezel ring */}
      <mesh position={[0, 0.098, 0]}>
        <torusGeometry args={[0.535, 0.018, 12, 56]} />
        <meshPhysicalMaterial color="#B8922E" metalness={1} roughness={0.15} />
      </mesh>

      <DialFace />

      {/* === NEEDLE === */}
      <group ref={needleRef} position={[0, 0.14, 0]}>
        {/* Needle shaft */}
        <mesh position={[0.17, 0, 0.004]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.02, 0.38, 6]} />
          <meshPhysicalMaterial color="#FF3333" metalness={0.9} roughness={0.06} emissive="#FF1111" emissiveIntensity={0.6} envMapIntensity={3} />
        </mesh>
        {/* Counterweight */}
        <mesh position={[-0.065, 0, 0.004]} rotation={[0, 0, Math.PI / 2]}>
          <coneGeometry args={[0.022, 0.12, 6]} />
          <meshPhysicalMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Center pivot */}
        <mesh>
          <cylinderGeometry args={[0.038, 0.038, 0.015, 14]} />
          <UltraGoldMat roughness={0.02} />
        </mesh>
        <mesh position={[0, 0.01, 0]}>
          <sphereGeometry args={[0.032, 14, 14]} />
          <UltraGoldMat roughness={0.01} />
        </mesh>
        <pointLight color="#FF3333" intensity={0.8} distance={0.8} />
      </group>

      {/* === DIGITAL DISPLAY === */}
      {/* Display housing */}
      <mesh position={[0, -0.32, 0.72]} rotation={[0.4, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 0.3, 0.065]} />
        <MatteBlackMat />
      </mesh>
      {/* OLED screen */}
      <mesh position={[0, -0.32, 0.754]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.52, 0.22, 0.006]} />
        <OledScreenMat color="#00FFAA" emissiveIntensity={0.85} />
      </mesh>
      {/* Screen content lines (weight readout segments) */}
      {[0.055, 0.006, -0.044].map((y, i) => (
        <mesh key={i} position={[i === 1 ? 0.04 : -0.02, -0.32 + y - 0.005, 0.758]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[i === 0 ? 0.22 : 0.18, 0.016, 0.004]} />
          <OledScreenMat color="#00FF88" emissiveIntensity={1.2} />
        </mesh>
      ))}
      {/* Screen border glow */}
      <pointLight color="#00FFAA" intensity={0.8} distance={1.2} position={[0, -0.4, 0.9]} />

      {/* === LIGHTING === */}
      <pointLight color="#D4A843" intensity={3.5} distance={6} position={[0, 2, 0]} />
      <pointLight color="#FFFFFF" intensity={2} distance={4} position={[1.5, 0.5, 1.5]} />
      <pointLight color="#AACCFF" intensity={2} distance={4} position={[-1.5, 0, -1]} />
      <spotLight position={[0, 5, 3]} angle={0.25} penumbra={0.6} intensity={5} color="#FFF8EE" castShadow />
    </group>
  )
}