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
      style={{
        zIndex: 0,
        ...style,
      }}
    >
      <Canvas
<<<<<<< HEAD
        camera={{ position: cameraPosition, fov }}
        dpr={1}
        frameloop="always"
=======
        camera={{
          position: cameraPosition,
          fov,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 1.2]}
        shadows={false}
>>>>>>> e95beb2 (updated 3D section)
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
<<<<<<< HEAD
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

=======
          stencil: false,
          depth: true,
        }}
        style={{
          background: 'transparent',
        }}
      >
        <Suspense fallback={null}>
          {/* Main ambient fill */}
          <ambientLight intensity={0.45} />

          {/* Main key light */}
          <directionalLight
            position={[5, 6, 4]}
            intensity={1.6}
          />

          {/* Gold accent light */}
          <directionalLight
            position={[-4, 2, 3]}
            intensity={0.6}
            color="#C9A84C"
          />

          {/* Lightweight environment */}
          <Environment
            preset="studio"
            background={false}
          />

          {/* Auto lower DPR on weak devices */}
          <AdaptiveDpr pixelated />

>>>>>>> e95beb2 (updated 3D section)
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}