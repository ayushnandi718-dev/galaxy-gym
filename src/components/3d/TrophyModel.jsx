import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function UltraGoldMat({ roughness = 0.03, anisotropy = 0.8 }) {
  return (
    <meshPhysicalMaterial
      color="#D4A843"
      metalness={1.0}
      roughness={roughness}
      reflectivity={1}
      clearcoat={0.6}
      clearcoatRoughness={0.08}
      envMapIntensity={5}
      anisotropy={anisotropy}
      anisotropyRotation={Math.PI / 4}
      iridescence={0.15}
      iridescenceIOR={1.8}
      sheen={0.3}
      sheenColor="#FFD700"
    />
  )
}

function BurnishedGoldMat() {
  return (
    <meshPhysicalMaterial
      color="#B8922E"
      metalness={1.0}
      roughness={0.12}
      reflectivity={1}
      clearcoat={0.3}
      clearcoatRoughness={0.2}
      envMapIntensity={3}
    />
  )
}

function DarkEngravedMat() {
  return (
    <meshPhysicalMaterial
      color="#0D0D0D"
      metalness={0.7}
      roughness={0.35}
      reflectivity={0.6}
      clearcoat={0.5}
      clearcoatRoughness={0.4}
    />
  )
}

function CupRibs({ y, count = 24 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2
        const r = 0.515
        return (
          <mesh key={i} position={[Math.cos(angle) * r, y, Math.sin(angle) * r]} rotation={[0, -angle, 0]} castShadow>
            <boxGeometry args={[0.012, 0.06, 0.012]} />
            <UltraGoldMat roughness={0.08} />
          </mesh>
        )
      })}
    </>
  )
}

function EngravingLine({ r, y, count = 64 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const a = (i / count) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * r, y, Math.sin(a) * r]}>
            <boxGeometry args={[0.008, 0.004, 0.008]} />
            <BurnishedGoldMat />
          </mesh>
        )
      })}
    </>
  )
}

export default function TrophyModel() {
  const groupRef = useRef()
  const velRef = useRef({ y: 0, ry: 0.4, rz: 0 })
  const stateRef = useRef({ ry: 0, rz: 0, py: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Physics-based float with damping
    const targetY = Math.sin(t * 0.7) * 0.12
    stateRef.current.py += (targetY - stateRef.current.py) * 0.05

    // Inertial rotation
    stateRef.current.ry += velRef.current.ry * delta
    velRef.current.ry = 0.38 + Math.sin(t * 0.1) * 0.04

    // Subtle wobble
    const targetRz = Math.sin(t * 0.35) * 0.032
    stateRef.current.rz += (targetRz - stateRef.current.rz) * 0.04

    groupRef.current.rotation.y = stateRef.current.ry
    groupRef.current.rotation.z = stateRef.current.rz
    groupRef.current.position.y = stateRef.current.py
  })

  return (
    <group ref={groupRef} scale={0.88}>

      {/* === BASE PLATFORM === */}
      <mesh castShadow receiveShadow position={[0, -0.75, 0]}>
        <cylinderGeometry args={[0.70, 0.80, 0.08, 64]} />
        <UltraGoldMat roughness={0.08} />
      </mesh>
      {/* Base bevel outer */}
      <mesh position={[0, -0.72, 0]}>
        <torusGeometry args={[0.72, 0.04, 20, 64]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Base step */}
      <mesh castShadow position={[0, -0.68, 0]}>
        <cylinderGeometry args={[0.62, 0.70, 0.06, 64]} />
        <UltraGoldMat roughness={0.06} />
      </mesh>
      {/* Base engraving ring */}
      <EngravingLine r={0.63} y={-0.64} count={80} />

      {/* Inscription plate */}
      <mesh position={[0, -0.71, 0.66]} rotation={[0.08, 0, 0]} castShadow>
        <boxGeometry args={[0.52, 0.12, 0.012]} />
        <DarkEngravedMat />
      </mesh>
      {/* Plate border */}
      {[[-0.24, 0], [0.24, 0], [0, 0.048], [0, -0.048]].map(([ox, oy], i) => (
        <mesh key={i} position={[ox, -0.71 + oy, 0.668]} rotation={[0.08, 0, 0]}>
          <boxGeometry args={i < 2 ? [0.008, 0.12, 0.006] : [0.52, 0.008, 0.006]} />
          <UltraGoldMat roughness={0.05} />
        </mesh>
      ))}

      {/* === STEM === */}
      {/* Stem lower taper */}
      <mesh castShadow position={[0, -0.56, 0]}>
        <cylinderGeometry args={[0.115, 0.16, 0.22, 32]} />
        <UltraGoldMat roughness={0.04} />
      </mesh>
      {/* Center knob */}
      <mesh castShadow position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.21, 48, 48]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Knob ring top */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.18, 0.028, 20, 48]} />
        <BurnishedGoldMat />
      </mesh>
      {/* Knob ring bottom */}
      <mesh position={[0, -0.25, 0]}>
        <torusGeometry args={[0.18, 0.028, 20, 48]} />
        <BurnishedGoldMat />
      </mesh>
      {/* Stem upper taper */}
      <mesh castShadow position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.13, 0.115, 0.22, 32]} />
        <UltraGoldMat roughness={0.04} />
      </mesh>
      {/* Waist ring */}
      <mesh position={[0, 0.33, 0]}>
        <torusGeometry args={[0.145, 0.04, 20, 48]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>

      {/* === CUP BODY === */}
      {/* Lower cup flare */}
      <mesh castShadow position={[0, 0.58, 0]}>
        <cylinderGeometry args={[0.46, 0.18, 0.44, 64]} />
        <UltraGoldMat roughness={0.03} />
      </mesh>
      {/* Cup waist ring */}
      <mesh position={[0, 0.8, 0]}>
        <torusGeometry args={[0.47, 0.035, 18, 64]} />
        <BurnishedGoldMat />
      </mesh>
      {/* Main cup barrel */}
      <mesh castShadow position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.52, 0.46, 0.46, 64]} />
        <UltraGoldMat roughness={0.04} />
      </mesh>
      {/* Knurling ribs on cup */}
      <CupRibs y={1.05} count={28} />
      {/* Upper cup flare */}
      <mesh castShadow position={[0, 1.34, 0]}>
        <cylinderGeometry args={[0.58, 0.52, 0.2, 64]} />
        <UltraGoldMat roughness={0.03} />
      </mesh>
      {/* Rim torus */}
      <mesh castShadow position={[0, 1.46, 0]}>
        <torusGeometry args={[0.60, 0.075, 24, 64]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Inner rim bevel */}
      <mesh position={[0, 1.38, 0]}>
        <torusGeometry args={[0.52, 0.04, 14, 64]} />
        <BurnishedGoldMat />
      </mesh>
      {/* Cup inner darkness */}
      <mesh position={[0, 1.18, 0]}>
        <cylinderGeometry args={[0.50, 0.50, 0.22, 32]} />
        <DarkEngravedMat />
      </mesh>

      {/* === HANDLES === */}
      {[-1, 1].map((side) => {
        const x = side * 0.82
        const flip = side === -1 ? Math.PI : 0
        return (
          <group key={side} position={[x, 0.92, 0]} rotation={[0, 0, flip]}>
            {/* Main arc */}
            <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.27, 0.048, 20, 36, Math.PI]} />
              <UltraGoldMat roughness={0.03} />
            </mesh>
            {/* Handle end caps */}
            <mesh castShadow position={[0, -0.27, 0]}>
              <sphereGeometry args={[0.056, 16, 16]} />
              <UltraGoldMat roughness={0.02} />
            </mesh>
            <mesh castShadow position={[0, 0.27, 0]}>
              <sphereGeometry args={[0.056, 16, 16]} />
              <UltraGoldMat roughness={0.02} />
            </mesh>
            {/* Handle middle ring */}
            <mesh position={[0.27, 0, 0]}>
              <torusGeometry args={[0.06, 0.02, 12, 24]} />
              <BurnishedGoldMat />
            </mesh>
          </group>
        )
      })}

      {/* === STARS ON CUP === */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2
        const r = 0.42
        return (
          <group key={i} position={[Math.cos(angle) * r, 1.05, Math.sin(angle) * r]} rotation={[0, -angle, 0]}>
            {/* 5-pointed star via pentagons */}
            {Array.from({ length: 5 }).map((_, j) => {
              const a2 = (j / 5) * Math.PI * 2
              return (
                <mesh key={j} position={[Math.cos(a2) * 0.038, 0, Math.sin(a2) * 0.038]} castShadow>
                  <boxGeometry args={[0.028, 0.028, 0.022]} />
                  <meshPhysicalMaterial color="#FFE566" metalness={1} roughness={0.01} emissive="#FFD700" emissiveIntensity={0.6} envMapIntensity={5} />
                </mesh>
              )
            })}
            <mesh castShadow>
              <sphereGeometry args={[0.022, 10, 10]} />
              <meshPhysicalMaterial color="#FFE566" metalness={1} roughness={0.01} emissive="#FFD700" emissiveIntensity={0.8} />
            </mesh>
          </group>
        )
      })}

      {/* === LIGHTING === */}
      <pointLight color="#FFD700" intensity={3.5} distance={6} position={[0, 1.5, 0.6]} />
      <pointLight color="#FFA500" intensity={1.8} distance={4} position={[-1.2, 0.5, -0.8]} />
      <pointLight color="#C9A84C" intensity={2} distance={5} position={[1.0, -0.5, 1.0]} />
      <pointLight color="#ffffff" intensity={1.2} distance={3} position={[0, 0.5, 1.5]} />
      <spotLight
        position={[0, 4, 2]}
        angle={0.25}
        penumbra={0.5}
        intensity={4}
        color="#FFE0A0"
        castShadow
      />
    </group>
  )
}