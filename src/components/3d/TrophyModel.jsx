import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function TrophyModel() {
  const groupRef = useRef()

  const { scene } = useGLTF('/models/trophy.glb')
  const { size } = useThree()

  const scale = useMemo(() => {
    if (size.width < 640) return 0.55
    if (size.width < 1024) return 0.75
    return 1
  }, [size.width])

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.getElapsedTime()

    groupRef.current.position.y =
      Math.sin(t * 0.8) * 0.08

    groupRef.current.rotation.y =
      Math.sin(t * 0.25) * 0.25
  })

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  )
}

useGLTF.preload('/models/trophy.glb')