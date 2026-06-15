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
      iridescence={0.12}
      iridescenceIOR={1.9}
      sheen={0.2}
      sheenColor="#FFD700"
    />
  )
}

function WornGoldMat() {
  return (
    <meshPhysicalMaterial
      color="#B5892A"
      metalness={0.98}
      roughness={0.18}
      reflectivity={0.9}
      clearcoat={0.2}
      clearcoatRoughness={0.3}
      envMapIntensity={3}
    />
  )
}

function GemMat({ color, emissive }) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.0}
      roughness={0.0}
      transmission={0.92}
      thickness={1.8}
      ior={2.42}
      envMapIntensity={8}
      clearcoat={1}
      clearcoatRoughness={0.0}
      emissive={emissive}
      emissiveIntensity={0.15}
      reflectivity={1}
    />
  )
}

function GemFacets({ position, color, emissive, size = 0.11 }) {
  return (
    <group position={position}>
      {/* Main gem */}
      <mesh castShadow>
        <octahedronGeometry args={[size, 2]} />
        <GemMat color={color} emissive={emissive} />
      </mesh>
      {/* Gem girdle ring */}
      <mesh>
        <torusGeometry args={[size * 0.88, size * 0.055, 10, 32]} />
        <UltraGoldMat roughness={0.02} />
      </mesh>
      {/* Gem setting prongs */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * size * 0.82, -size * 0.1, Math.sin(a) * size * 0.82]}>
            <cylinderGeometry args={[0.013, 0.009, size * 0.55, 8]} />
            <UltraGoldMat roughness={0.04} />
          </mesh>
        )
      })}
      {/* Gem glow point light */}
      <pointLight color={emissive} intensity={1.8} distance={1.5} />
    </group>
  )
}

function FiligreeArc({ startAngle, endAngle, radius, y, count = 8 }) {
  const points = []
  for (let i = 0; i <= count; i++) {
    const t = i / count
    const a = startAngle + (endAngle - startAngle) * t
    const wave = Math.sin(t * Math.PI) * 0.08
    points.push(new THREE.Vector3(Math.cos(a) * (radius + wave), y + wave * 0.5, Math.sin(a) * (radius + wave)))
  }
  const curve = new THREE.CatmullRomCurve3(points)
  const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.018, 8, false)
  return (
    <mesh castShadow>
      <primitive object={tubeGeo} />
      <WornGoldMat />
    </mesh>
  )
}

export default function CrownModel() {
  const groupRef = useRef()
  const floatRef = useRef({ ry: 0, py: 0 })

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    floatRef.current.ry += 0.48 * (1 / 60)
    const targetPy = Math.sin(t * 0.75) * 0.14
    floatRef.current.py += (targetPy - floatRef.current.py) * 0.04

    groupRef.current.rotation.y = floatRef.current.ry
    groupRef.current.position.y = floatRef.current.py
    groupRef.current.rotation.z = Math.sin(t * 0.28) * 0.048
    groupRef.current.rotation.x = Math.sin(t * 0.19) * 0.022
  })

  const bandRadius = 0.72
  const numPeaks = 5
  const gemColors = [
    { color: '#FF2244', emissive: '#FF0022' },
    { color: '#2255FF', emissive: '#0033FF' },
    { color: '#22FFAA', emissive: '#00FFAA' },
    { color: '#FF6622', emissive: '#FF4400' },
    { color: '#AA22FF', emissive: '#8800FF' },
  ]

  return (
    <group ref={groupRef} scale={0.92}>

      {/* === BASE BAND - thick lower ring === */}
      <mesh castShadow position={[0, -0.35, 0]}>
        <torusGeometry args={[bandRadius, 0.10, 24, 80]} />
        <UltraGoldMat roughness={0.04} />
      </mesh>
      {/* Inner base band detail */}
      <mesh position={[0, -0.29, 0]}>
        <torusGeometry args={[bandRadius - 0.04, 0.025, 14, 80]} />
        <WornGoldMat />
      </mesh>
      {/* Lower knurl dots */}
      {Array.from({ length: 32 }).map((_, i) => {
        const a = (i / 32) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * bandRadius, -0.38, Math.sin(a) * bandRadius]}>
            <sphereGeometry args={[0.022, 8, 8]} />
            <WornGoldMat />
          </mesh>
        )
      })}

      {/* === UPPER BAND === */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <torusGeometry args={[bandRadius, 0.07, 20, 80]} />
        <UltraGoldMat roughness={0.03} />
      </mesh>

      {/* === FILIGREE ARCS BETWEEN PEAKS === */}
      {Array.from({ length: numPeaks }).map((_, i) => {
        const a1 = ((i + 0.08) / numPeaks) * Math.PI * 2
        const a2 = ((i + 0.92) / numPeaks) * Math.PI * 2
        return <FiligreeArc key={i} startAngle={a1} endAngle={a2} radius={bandRadius * 0.98} y={-0.12} count={12} />
      })}

      {/* === PEAKS === */}
      {Array.from({ length: numPeaks }).map((_, i) => {
        const angle = (i / numPeaks) * Math.PI * 2
        const x = Math.cos(angle) * bandRadius
        const z = Math.sin(angle) * bandRadius
        const rotY = -angle + Math.PI / 2
        return (
          <group key={i} position={[x, 0, z]} rotation={[0, rotY, 0]}>
            {/* Peak base pillar */}
            <mesh castShadow position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.095, 0.11, 0.56, 20]} />
              <UltraGoldMat roughness={0.04} />
            </mesh>
            {/* Peak pillar collar bottom */}
            <mesh position={[0, 0.06, 0]}>
              <torusGeometry args={[0.115, 0.028, 14, 24]} />
              <UltraGoldMat roughness={0.02} />
            </mesh>
            {/* Peak pillar collar mid */}
            <mesh position={[0, 0.35, 0]}>
              <torusGeometry args={[0.1, 0.022, 12, 24]} />
              <WornGoldMat />
            </mesh>
            {/* Spike fleur-de-lis base */}
            <mesh castShadow position={[0, 0.62, 0]}>
              <cylinderGeometry args={[0.075, 0.095, 0.12, 16]} />
              <UltraGoldMat roughness={0.03} />
            </mesh>
            {/* Spike */}
            <mesh castShadow position={[0, 0.88, 0]}>
              <coneGeometry args={[0.075, 0.72, 12]} />
              <UltraGoldMat roughness={0.02} />
            </mesh>
            {/* Side fleurons */}
            {[-1, 1].map((side) => (
              <group key={side} position={[0, 0.72, 0]}>
                <mesh castShadow position={[side * 0.11, 0.06, 0]} rotation={[0, 0, side * 0.5]}>
                  <sphereGeometry args={[0.048, 12, 12]} />
                  <UltraGoldMat roughness={0.02} />
                </mesh>
              </group>
            ))}
            {/* Gem on spike base */}
            <GemFacets
              position={[0, 0.58, 0.1]}
              color={gemColors[i].color}
              emissive={gemColors[i].emissive}
              size={0.095}
            />
          </group>
        )
      })}

      {/* === BETWEEN-PEAK ARCHED ORNAMENTS === */}
      {Array.from({ length: numPeaks }).map((_, i) => {
        const angle = ((i + 0.5) / numPeaks) * Math.PI * 2
        const x = Math.cos(angle) * bandRadius
        const z = Math.sin(angle) * bandRadius
        return (
          <group key={i} position={[x, -0.14, z]}>
            <mesh castShadow>
              <sphereGeometry args={[0.065, 16, 16]} />
              <UltraGoldMat roughness={0.02} />
            </mesh>
            {/* Small side pearls */}
            {[-0.12, 0.12].map((offset, j) => {
              const perp = Math.cos(angle + Math.PI / 2) * offset
              const perpZ = Math.sin(angle + Math.PI / 2) * offset
              return (
                <mesh key={j} position={[perp, 0, perpZ]}>
                  <sphereGeometry args={[0.034, 10, 10]} />
                  <meshPhysicalMaterial color="#FFFFF0" metalness={0.05} roughness={0.1} transmission={0.3} ior={1.5} envMapIntensity={4} />
                </mesh>
              )
            })}
          </group>
        )
      })}

      {/* === LIGHTING === */}
      <pointLight color="#FFD700" intensity={4} distance={5} position={[0, 1.2, 0.5]} />
      <pointLight color="#FF8800" intensity={2} distance={3} position={[-1, 0, -0.8]} />
      <pointLight color="#8844FF" intensity={1.2} distance={2} position={[0.5, -0.5, 1]} />
      <pointLight color="#FF2255" intensity={1.5} distance={2} position={[-0.5, 0.5, 0.5]} />
      <pointLight color="#00CCFF" intensity={1} distance={2} position={[0.8, -0.3, -0.8]} />
      <spotLight position={[2, 5, 2]} angle={0.3} penumbra={0.6} intensity={5} color="#FFF5E0" castShadow />
    </group>
  )
}