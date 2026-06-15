import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function ScaleModel() {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
  });

  return (
    <group ref={groupRef} scale={1.2}>
      
      {/* Base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.22, 2.4]} />
        <meshPhysicalMaterial
          color="#0f0f0f"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>

      {/* Glass Top */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[2.15, 0.05, 2.15]} />
        <meshPhysicalMaterial
          color="#88ccff"
          transmission={0.85}
          roughness={0}
          thickness={0.4}
          transparent
        />
      </mesh>

      {/* Gold Border */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[2.5, 0.08, 2.5]} />
        <meshPhysicalMaterial
          color="#D4A843"
          metalness={1}
          roughness={0.05}
        />
      </mesh>

      {/* Feet */}
      {[
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          position={[x, -0.16, z]}
          castShadow
        >
          <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
          <meshPhysicalMaterial
            color="#D4A843"
            metalness={1}
            roughness={0.08}
          />
        </mesh>
      ))}

      {/* Display Housing */}
      <mesh position={[0, 0.18, 0.72]}>
        <boxGeometry args={[0.9, 0.28, 0.08]} />
        <meshPhysicalMaterial
          color="#111"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* OLED Display */}
      <mesh position={[0, 0.19, 0.77]}>
        <boxGeometry args={[0.72, 0.16, 0.01]} />
        <meshPhysicalMaterial
          color="#00ff99"
          emissive="#00ff99"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Decorative Gold Circles */}
      {[
        [-0.65, -0.65],
        [0.65, -0.65],
        [-0.65, 0.65],
        [0.65, 0.65],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.15, z]}>
          <cylinderGeometry args={[0.18, 0.18, 0.02, 32]} />
          <meshPhysicalMaterial
            color="#D4A843"
            metalness={1}
            roughness={0.03}
          />
        </mesh>
      ))}

      {/* Glow */}
      <pointLight
        color="#00ff99"
        intensity={1.5}
        distance={3}
        position={[0, 0.3, 0.8]}
      />

      <pointLight
        color="#D4A843"
        intensity={2}
        distance={5}
        position={[0, 1.5, 0]}
      />
    </group>
  );
}