import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'

export default function BarbellModel() {
  const modelRef = useRef()
  const { scene } = useGLTF('/models/barbell.glb')
  const { viewport } = useThree()

  useFrame((state, delta) => {
    if (!modelRef.current) return

    const t = state.clock.getElapsedTime()

    modelRef.current.rotation.y += delta * 0.35
    modelRef.current.rotation.z =
      Math.sin(t * 0.6) * 0.06

    modelRef.current.position.y =
      Math.sin(t * 0.8) * 0.12
  })

  const scale =
    viewport.width < 6
      ? 0.7
      : viewport.width < 10
      ? 1
      : 1.3

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
    />
  )
}

useGLTF.preload('/models/barbell.glb')