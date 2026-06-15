import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function ArrowTransformModel() {
  const groupRef = useRef()

  const { viewport } = useThree()
  const { scene } = useGLTF('/models/transformation.glb')

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

    // Floating animation
    groupRef.current.position.y =
      Math.sin(t * 0.8) * 0.08

    // Slow premium rotation
    groupRef.current.rotation.y =
      Math.sin(t * 0.4) * 0.15

    // Slight tilt
    groupRef.current.rotation.z =
      Math.sin(t * 0.6) * 0.03
  })

  const scale =
    viewport.width < 5
      ? 0.65
      : viewport.width < 8
      ? 0.9
      : 1.2

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[0, -0.5, 0]}
    >
      <primitive object={scene.clone()} />

      {/* Premium lighting */}
      <pointLight
        position={[0, 2, 1]}
        intensity={2}
        color="#FFD700"
        distance={8}
      />

      <pointLight
        position={[-2, 1, 1]}
        intensity={1}
        color="#ffffff"
        distance={6}
      />

      <pointLight
        position={[2, 1, 1]}
        intensity={1}
        color="#C9A84C"
        distance={6}
      />
    </group>
  )
}

useGLTF.preload('/models/transformation.glb')