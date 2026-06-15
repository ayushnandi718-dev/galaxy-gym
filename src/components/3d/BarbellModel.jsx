import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ChromeBarMat() {
  return (
    <meshPhysicalMaterial
      color="#D8D8D8"
      metalness={1.0}
      roughness={0.01}
      reflectivity={1}
      clearcoat={1}
      clearcoatRoughness={0.02}
      envMapIntensity={6}
      anisotropy={1.0}
      anisotropyRotation={Math.PI / 2}
    />
  )
}

function KnurlingMat() {
  return (
    <meshPhysicalMaterial
      color="#2A2A2A"
      metalness={0.85}
      roughness={0.55}
      envMapIntensity={1.5}
    />
  )
}

function UltraGoldMat() {
  return (
    <meshPhysicalMaterial
      color="#D4A843"
      metalness={1.0}
      roughness={0.02}
      reflectivity={1}
      clearcoat={0.8}
      clearcoatRoughness={0.04}
      envMapIntensity={6}
      anisotropy={0.9}
      iridescence={0.1}
      iridescenceIOR={1.85}
    />
  )
}

function RubberMat() {
  return (
    <meshPhysicalMaterial
      color="#0D0D0D"
      metalness={0.02}
      roughness={0.85}
      clearcoat={0.3}
      clearcoatRoughness={0.6}
      envMapIntensity={0.8}
    />
  )
}

function KnurlingSection({ z, length = 0.8, radius = 0.068 }) {
  const rows = 16
  const cols = 24
  return (
    <>
      {/* Knurling base */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, z]}>
        <cylinderGeometry args={[radius, radius, length, 32]} />
        <KnurlingMat />
      </mesh>
      {/* Diamond pattern ridges */}
      {Array.from({ length: rows }).map((_, ri) => {
        const zPos = z - length / 2 + (ri / (rows - 1)) * length
        return Array.from({ length: cols }).map((_, ci) => {
          const a = (ci / cols) * Math.PI * 2 + (ri % 2) * (Math.PI / cols)
          return (
            <mesh
              key={`${ri}-${ci}`}
              position={[Math.cos(a) * (radius + 0.006), 0, zPos + Math.sin(a) * 0.01]}
              rotation={[0, -a, 0]}
            >
              <boxGeometry args={[0.008, 0.014, 0.022]} />
              <meshPhysicalMaterial color="#3A3A3A" metalness={0.8} roughness={0.4} />
            </mesh>
          )
        })
      })}
    </>
  )
}

function Plate({ z, size, thickness = 0.14 }) {
  const outerR = size
  const innerR = 0.055
  return (
    <group position={[0, 0, z]}>
      {/* Main plate disc */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[outerR, outerR, thickness, 56]} />
        <RubberMat />
      </mesh>
      {/* Plate hub chrome ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, thickness + 0.01, 24]} />
        <ChromeBarMat />
      </mesh>
      {/* Outer gold ring inset 1 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[outerR * 0.88, 0.035, 16, 56]} />
        <UltraGoldMat />
      </mesh>
      {/* Outer gold ring inset 2 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[outerR * 0.76, 0.022, 12, 48]} />
        <UltraGoldMat />
      </mesh>
      {/* Weight label insets */}
      {Array.from({ length: 4 }).map((_, i) => {
        const a = (i / 4) * Math.PI * 2
        const r = outerR * 0.55
        return (
          <mesh key={i} position={[Math.cos(a) * r, thickness / 2 + 0.004, Math.sin(a) * r]} rotation={[-Math.PI / 2, 0, a]}>
            <boxGeometry args={[0.09, 0.042, 0.008]} />
            <UltraGoldMat />
          </mesh>
        )
      })}
      {/* Handle cutout simulation */}
      {Array.from({ length: 3 }).map((_, i) => {
        const a = (i / 3) * Math.PI * 2 + Math.PI / 6
        const r = outerR * 0.68
        return (
          <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[Math.cos(a) * r, 0, Math.sin(a) * r]}>
            <torusGeometry args={[0.068, 0.026, 10, 24]} />
            <meshPhysicalMaterial color="#080808" metalness={0.1} roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

export default function BarbellModel() {
  const groupRef = useRef()
  const physRef = useRef({ ry: 0, rz: 0, py: 0 })

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Realistic momentum
    physRef.current.ry += 0.33 * delta + Math.sin(t * 0.08) * 0.004
    const targetRz = Math.sin(t * 0.5) * 0.11
    physRef.current.rz += (targetRz - physRef.current.rz) * 0.03
    const targetPy = Math.sin(t * 0.62) * 0.1
    physRef.current.py += (targetPy - physRef.current.py) * 0.05

    groupRef.current.rotation.y = physRef.current.ry
    groupRef.current.rotation.z = physRef.current.rz
    groupRef.current.position.y = physRef.current.py
  })

  return (
    <group ref={groupRef} scale={0.82}>

      {/* === MAIN BAR === */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.057, 0.057, 3.8, 32]} />
        <ChromeBarMat />
      </mesh>

      {/* === KNURLING SECTIONS === */}
      <KnurlingSection z={0} length={0.95} radius={0.064} />
      <KnurlingSection z={-1.05} length={0.28} radius={0.062} />
      <KnurlingSection z={1.05} length={0.28} radius={0.062} />

      {/* === COLLAR RINGS === */}
      {[-0.58, 0.58, -1.22, 1.22].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.105, 0.105, 0.065, 28]} />
            <UltraGoldMat />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.108, 0.018, 12, 28]} />
            <meshPhysicalMaterial color="#C9A84C" metalness={1} roughness={0.01} envMapIntensity={4} />
          </mesh>
        </group>
      ))}

      {/* === WEIGHT PLATES === */}
      <Plate z={-1.55} size={0.56} thickness={0.14} />
      <Plate z={-1.72} size={0.56} thickness={0.14} />
      <Plate z={-1.90} size={0.46} thickness={0.11} />
      <Plate z={1.55} size={0.56} thickness={0.14} />
      <Plate z={1.72} size={0.56} thickness={0.14} />
      <Plate z={1.90} size={0.46} thickness={0.11} />

      {/* === END CAPS === */}
      {[-2.06, 2.06].map((z, i) => (
        <group key={i} position={[0, 0, z]}>
          <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.082, 0.082, 0.12, 24]} />
            <UltraGoldMat />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.086, 16, 16]} />
            <UltraGoldMat />
          </mesh>
        </group>
      ))}

      {/* === LIGHTING === */}
      <pointLight color="#D8D8FF" intensity={3} distance={6} position={[0, 2, 0]} />
      <pointLight color="#FFD700" intensity={2.5} distance={5} position={[0, 0, 0]} />
      <pointLight color="#FFFFFF" intensity={2} distance={4} position={[1.5, 0.5, 1.5]} />
      <pointLight color="#FFA500" intensity={1.5} distance={3} position={[-1.5, -0.5, -1]} />
      <spotLight position={[3, 6, 3]} angle={0.2} penumbra={0.7} intensity={5} color="#FFFFFF" castShadow />
    </group>
  )
}