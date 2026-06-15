import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GoldMat() {
  return <meshPhysicalMaterial color="#C9A84C" metalness={0.99} roughness={0.02} reflectivity={1} clearcoat={1} envMapIntensity={3} />
}
function BeforeMat() {
  return <meshPhysicalMaterial color="#444444" metalness={0.8} roughness={0.3} />
}
function AfterMat() {
  return <meshPhysicalMaterial color="#C9A84C" metalness={0.95} roughness={0.05} envMapIntensity={2} clearcoat={1} />
}

function HumanFigure({ position, scale, mat: Mat }) {
  return (
    <group position={position} scale={scale}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <Mat />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.6, 8, 16]} />
        <Mat />
      </mesh>
      {/* Left arm */}
      <mesh position={[-0.45, 0.85, 0]} rotation={[0,0,0.4]} castShadow>
        <capsuleGeometry args={[0.1, 0.55, 6, 12]} />
        <Mat />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.45, 0.85, 0]} rotation={[0,0,-0.4]} castShadow>
        <capsuleGeometry args={[0.1, 0.55, 6, 12]} />
        <Mat />
      </mesh>
      {/* Left leg */}
      <mesh position={[-0.18, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 6, 12]} />
        <Mat />
      </mesh>
      {/* Right leg */}
      <mesh position={[0.18, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.12, 0.6, 6, 12]} />
        <Mat />
      </mesh>
    </group>
  )
}

export default function ArrowTransformModel() {
  const groupRef = useRef()
  const arrowRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.3
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.1
    if (arrowRef.current) {
      arrowRef.current.position.x = Math.sin(t * 2) * 0.08
      arrowRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.08)
    }
  })

  return (
    <group ref={groupRef} scale={0.55}>
      {/* Before figure - slightly heavier look */}
      <HumanFigure position={[-1.5, -0.8, 0]} scale={[1.2, 1.0, 1.2]} mat={BeforeMat} />

      {/* Arrow in middle */}
      <group ref={arrowRef} position={[0, 0.2, 0]}>
        {/* Arrow shaft */}
        <mesh rotation={[0,0,Math.PI/2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.0, 16]} />
          <GoldMat />
        </mesh>
        {/* Arrowhead */}
        <mesh position={[0.7, 0, 0]} rotation={[0,0,-Math.PI/2]}>
          <coneGeometry args={[0.18, 0.35, 16]} />
          <GoldMat />
        </mesh>
        {/* Glow on arrow */}
        <pointLight color="#C9A84C" intensity={2} distance={2} />
      </group>

      {/* After figure - leaner, taller */}
      <HumanFigure position={[1.5, -0.8, 0]} scale={[0.9, 1.0, 0.9]} mat={AfterMat} />

      {/* Lightning bolt particles around after */}
      {[0,1,2].map((i) => {
        const a = (i/3)*Math.PI*2
        return (
          <mesh key={i} position={[1.5 + Math.cos(a)*0.6, 0.5 + Math.sin(a)*0.5, Math.sin(a)*0.3]}>
            <octahedronGeometry args={[0.06]} />
            <meshPhysicalMaterial color="#FFE066" metalness={1} roughness={0.01} emissive="#FFD700" emissiveIntensity={1} />
          </mesh>
        )
      })}

      <pointLight color="#C9A84C" intensity={1.5} distance={6} position={[0,1,1]} />
    </group>
  )
}
