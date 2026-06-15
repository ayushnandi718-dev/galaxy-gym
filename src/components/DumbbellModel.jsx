import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshStandardMaterial, CylinderGeometry, SphereGeometry, MeshPhysicalMaterial } from 'three'
import * as THREE from 'three'

function DumbbellPart({ position, scale, color, metalness = 0.9, roughness = 0.1 }) {
  const mat = useMemo(() => new MeshPhysicalMaterial({
    color,
    metalness,
    roughness,
    reflectivity: 1,
    clearcoat: 0.5,
    clearcoatRoughness: 0.1,
  }), [color, metalness, roughness])

  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <cylinderGeometry args={[1, 1, 1, 32]} />
      <primitive object={mat} />
    </mesh>
  )
}

function WeightPlate({ position, rotation }) {
  const mat = useMemo(() => new MeshPhysicalMaterial({
    color: '#1a1a1a',
    metalness: 0.95,
    roughness: 0.05,
    reflectivity: 1,
  }), [])

  const ringMat = useMemo(() => new MeshPhysicalMaterial({
    color: '#C9A84C',
    metalness: 0.98,
    roughness: 0.02,
    reflectivity: 1,
    envMapIntensity: 2,
  }), [])

  return (
    <group position={position} rotation={rotation}>
      {/* Main plate body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.18, 48]} />
        <primitive object={mat} />
      </mesh>
      {/* Gold ring accent */}
      <mesh castShadow>
        <torusGeometry args={[1.05, 0.04, 16, 48]} />
        <primitive object={ringMat} />
      </mesh>
      {/* Center hole */}
      <mesh>
        <cylinderGeometry args={[0.18, 0.18, 0.22, 24]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Outer chamfer ring */}
      <mesh>
        <torusGeometry args={[1.15, 0.03, 8, 48]} />
        <primitive object={ringMat} />
      </mesh>
    </group>
  )
}

export default function DumbbellModel({ scrollProgress = 0 }) {
  const groupRef = useRef()
  const glowRef = useRef()

  const barMat = useMemo(() => new MeshPhysicalMaterial({
    color: '#888888',
    metalness: 0.99,
    roughness: 0.02,
    reflectivity: 1,
    clearcoat: 1,
  }), [])

  const goldMat = useMemo(() => new MeshPhysicalMaterial({
    color: '#C9A84C',
    metalness: 0.99,
    roughness: 0.02,
    reflectivity: 1,
    envMapIntensity: 3,
    clearcoat: 0.8,
  }), [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()

    // Floating animation
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.12
    // Auto-rotate + scroll influence
    groupRef.current.rotation.y = t * 0.25 + scrollProgress * Math.PI * 2
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.08 + scrollProgress * 0.5
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.04
  })

  return (
    <group ref={groupRef}>
      {/* Main bar */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.055, 0.055, 3.2, 24]} />
        <primitive object={barMat} />
      </mesh>

      {/* Knurling grip area - center */}
      <mesh>
        <cylinderGeometry args={[0.065, 0.065, 1.0, 20]} />
        <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Gold collar rings */}
      {[-0.65, 0.65].map((x, i) => (
        <mesh key={i} position={[0, x, 0]} castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.08, 24]} />
          <primitive object={goldMat} />
        </mesh>
      ))}

      {/* Collar locks */}
      {[-1.05, 1.05].map((x, i) => (
        <mesh key={i} position={[0, x, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.12, 0.1, 24]} />
          <primitive object={goldMat} />
        </mesh>
      ))}

      {/* Weight plates - left side */}
      <WeightPlate position={[0, -1.38, 0]} rotation={[0, 0, 0]} />
      <WeightPlate position={[0, -1.62, 0]} rotation={[0, 0, 0]} />

      {/* Weight plates - right side */}
      <WeightPlate position={[0, 1.38, 0]} rotation={[0, 0, 0]} />
      <WeightPlate position={[0, 1.62, 0]} rotation={[0, 0, 0]} />

      {/* End caps */}
      {[-1.88, 1.88].map((x, i) => (
        <mesh key={i} position={[0, x, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.12, 24]} />
          <primitive object={goldMat} />
        </mesh>
      ))}

      {/* Ambient glow sphere (invisible, just for glow effect) */}
      <pointLight color="#C9A84C" intensity={1.5} distance={4} position={[0, 0, 0]} />
    </group>
  )
}
