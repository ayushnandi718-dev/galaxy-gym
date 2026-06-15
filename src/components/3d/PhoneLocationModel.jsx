import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function GoldMaterial() {
  return (
    <meshPhysicalMaterial
      color="#D4A843"
      metalness={1}
      roughness={0.05}
      clearcoat={1}
      clearcoatRoughness={0.05}
      envMapIntensity={4}
    />
  );
}

function GlassMaterial() {
  return (
    <meshPhysicalMaterial
      color="#88ccff"
      transmission={0.85}
      roughness={0}
      thickness={0.5}
      transparent
      envMapIntensity={5}
    />
  );
}

function ScreenMaterial() {
  return (
    <meshPhysicalMaterial
      color="#00FF99"
      emissive="#00FF99"
      emissiveIntensity={1.2}
      roughness={0}
      metalness={0}
    />
  );
}

function Ring({ scale }) {
  return (
    <mesh scale={scale}>
      <torusGeometry args={[0.55, 0.015, 16, 64]} />
      <meshPhysicalMaterial
        color="#00E5FF"
        emissive="#00E5FF"
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function PhoneLocationModel() {
  const groupRef = useRef();

  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  const pinRef = useRef();

  const particles = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.12;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.03;
    }

    if (pinRef.current) {
      pinRef.current.position.y = 1.25 + Math.sin(t * 2) * 0.08;
    }

    if (ring1.current) {
      const s = 1 + Math.sin(t * 2) * 0.08;
      ring1.current.scale.setScalar(s);
    }

    if (ring2.current) {
      const s = 1.4 + Math.sin(t * 2 + 1) * 0.1;
      ring2.current.scale.setScalar(s);
    }

    if (ring3.current) {
      const s = 1.8 + Math.sin(t * 2 + 2) * 0.12;
      ring3.current.scale.setScalar(s);
    }

    particles.current.forEach((particle, i) => {
      if (!particle) return;

      const angle = t * 0.8 + i * 0.7;
      const radius = 1.2 + Math.sin(t + i) * 0.1;

      particle.position.x = Math.cos(angle) * radius;
      particle.position.z = Math.sin(angle) * radius;
      particle.position.y =
        0.4 + Math.sin(t * 2 + i) * 0.25;
    });
  });

  return (
    <group ref={groupRef} scale={0.9}>
      {/* PHONE BODY */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.25, 2.45, 0.14]} />
        <GoldMaterial />
      </mesh>

      {/* BACK PANEL */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[1.1, 2.25, 0.03]} />
        <meshPhysicalMaterial
          color="#0f0f0f"
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* SCREEN */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[1.05, 2.15, 0.02]} />
        <ScreenMaterial />
      </mesh>

      {/* GLASS */}
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[1.05, 2.15, 0.01]} />
        <GlassMaterial />
      </mesh>

      {/* CAMERA */}
      <mesh position={[0, 0.92, 0.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 24]} />
        <meshPhysicalMaterial
          color="#111"
          metalness={1}
          roughness={0.2}
        />
      </mesh>

      {/* GPS PIN */}
      <group ref={pinRef} position={[0, 1.25, 0]}>
        <mesh>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshPhysicalMaterial
            color="#FF3B3B"
            emissive="#FF3B3B"
            emissiveIntensity={1.8}
          />
        </mesh>

        <mesh position={[0, -0.22, 0]}>
          <coneGeometry args={[0.08, 0.28, 16]} />
          <meshPhysicalMaterial
            color="#FF3B3B"
            emissive="#FF3B3B"
            emissiveIntensity={1.8}
          />
        </mesh>
      </group>

      {/* SIGNAL RINGS */}
      <group position={[0, 1.25, 0]}>
        <group ref={ring1}>
          <Ring scale={1} />
        </group>

        <group ref={ring2}>
          <Ring scale={1.4} />
        </group>

        <group ref={ring3}>
          <Ring scale={1.8} />
        </group>
      </group>

      {/* SCREEN UI */}
      <mesh position={[0, 0.45, 0.11]}>
        <boxGeometry args={[0.55, 0.08, 0.01]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0, 0.22, 0.11]}>
        <boxGeometry args={[0.72, 0.05, 0.01]} />
        <meshBasicMaterial color="#00ffaa" />
      </mesh>

      <mesh position={[0, 0.08, 0.11]}>
        <boxGeometry args={[0.62, 0.04, 0.01]} />
        <meshBasicMaterial color="#00ffaa" />
      </mesh>

      <mesh position={[0, -0.06, 0.11]}>
        <boxGeometry args={[0.48, 0.04, 0.01]} />
        <meshBasicMaterial color="#00ffaa" />
      </mesh>

      {/* FLOATING PARTICLES */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => (particles.current[i] = el)}
        >
          <octahedronGeometry args={[0.04]} />
          <meshPhysicalMaterial
            color={i % 2 === 0 ? "#FFD700" : "#00E5FF"}
            emissive={i % 2 === 0 ? "#FFD700" : "#00E5FF"}
            emissiveIntensity={1.2}
            roughness={0}
            metalness={1}
          />
        </mesh>
      ))}

      {/* LIGHTING */}
      <pointLight
        color="#FFD700"
        intensity={2}
        distance={6}
        position={[0, 1.5, 1]}
      />

      <pointLight
        color="#00E5FF"
        intensity={2}
        distance={5}
        position={[0, 0.5, 1]}
      />

      <pointLight
        color="#FF3B3B"
        intensity={1.5}
        distance={3}
        position={[0, 1.5, 0]}
      />
    </group>
  );
}