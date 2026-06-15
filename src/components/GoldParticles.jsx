import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GoldParticles({ count = 180 }) {
  const meshRef = useRef()

  const [positions, speeds, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    const ph = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi) - 1

      spd[i] = 0.2 + Math.random() * 0.5
      ph[i] = Math.random() * Math.PI * 2
    }
    return [pos, spd, ph]
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  const material = useMemo(() => new THREE.PointsMaterial({
    color: '#C9A84C',
    size: 0.04,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  }), [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    const pos = meshRef.current.geometry.attributes.position

    for (let i = 0; i < count; i++) {
      const origX = positions[i * 3]
      const origY = positions[i * 3 + 1]
      const origZ = positions[i * 3 + 2]
      const phase = phases[i]
      const speed = speeds[i]

      pos.array[i * 3] = origX + Math.sin(t * speed + phase) * 0.15
      pos.array[i * 3 + 1] = origY + Math.cos(t * speed * 0.7 + phase) * 0.2
      pos.array[i * 3 + 2] = origZ + Math.sin(t * speed * 0.5 + phase * 1.3) * 0.1
    }
    pos.needsUpdate = true
    meshRef.current.rotation.y = t * 0.04
  })

  return <points ref={meshRef} geometry={geometry} material={material} />
}
