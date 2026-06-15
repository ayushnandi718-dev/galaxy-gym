import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'

/**
 * Reusable 3D canvas for section backgrounds.
 * Children = your 3D model(s).
 * The canvas is absolutely positioned behind glass content.
 */
export default function Section3DCanvas({
  children,
  cameraPosition = [0, 0, 5],
  fov = 45,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, ...style }}
    >
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.12} />
          <directionalLight position={[5, 8, 3]} intensity={2.2} color="#ffffff" />
          <directionalLight position={[-4, -2, -4]} intensity={0.4} color="#C9A84C" />
          <spotLight position={[3, 5, 3]} angle={0.4} penumbra={0.8} intensity={3} color="#C9A84C" />
          <Environment preset="city" />
          <AdaptiveDpr pixelated />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
