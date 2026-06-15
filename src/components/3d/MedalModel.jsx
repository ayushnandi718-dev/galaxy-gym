import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function MedalModel() {
  const groupRef = useRef()
  const { viewport } = useThree()

  const { scene } = useGLTF('/models/medal.glb')

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

    groupRef.current.rotation.y += 0.003
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.05
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.15
  })

  const scale =
    viewport.width < 5
      ? 0.9
      : viewport.width < 8
      ? 1.2
      : 1.5

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[0, 0, 0]}
    >
      <primitive object={scene.clone()} />
    </group>
  )
}

useGLTF.preload('/models/medal.glb')