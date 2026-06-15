import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

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
        dpr={1}
        frameloop="always"
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />

          <directionalLight
            position={[5, 8, 3]}
            intensity={1.5}
            color="#ffffff"
          />

          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
