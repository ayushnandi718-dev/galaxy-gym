import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function CrownModel() {
  const ref = useRef()
  const { viewport } = useThree()

  const { scene } = useGLTF('/models/crown.glb')

  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.getElapsedTime()

    ref.current.rotation.y += 0.003
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.03
    ref.current.position.y = Math.sin(t * 0.9) * 0.1
  })

  const scale =
    viewport.width < 5
      ? 0.8
      : viewport.width < 8
      ? 1
      : 1.25

  return (
    <group ref={ref} scale={scale}>
      <primitive object={scene.clone()} />

      <pointLight
        position={[0, 1.5, 1]}
        intensity={2}
        color="#FFD700"
      />
    </group>
  )
}

useGLTF.preload('/models/crown.glb')