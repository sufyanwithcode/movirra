"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { POSTERS, type Poster } from "./posters";

function PosterCard({
  poster,
  texture,
  reduced,
}: {
  poster: Poster;
  texture: THREE.Texture;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    const bob = reduced ? 0 : Math.sin(t * 0.6 + phase) * 0.12;
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      poster.position[1] + bob + (hovered ? 0.3 : 0),
      0.1,
    );
    g.position.z = THREE.MathUtils.lerp(
      g.position.z,
      poster.position[2] + (hovered ? 0.6 : 0),
      0.1,
    );
    const s = THREE.MathUtils.lerp(g.scale.x, hovered ? 1.08 : 1, 0.12);
    g.scale.setScalar(s);
  });

  return (
    <group
      ref={ref}
      position={poster.position}
      rotation={poster.rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[1.3, 1.9]} />
        <meshStandardMaterial color="#17130d" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh>
        <planeGeometry args={[1.2, 1.8]} />
        <meshStandardMaterial
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={hovered ? 0.35 : 0.14}
          roughness={0.62}
          metalness={0.04}
        />
      </mesh>
    </group>
  );
}

function Posters({ reduced }: { reduced: boolean }) {
  const urls = useMemo(() => POSTERS.map((p) => p.image), []);
  const textures = useTexture(urls) as THREE.Texture[];
  textures.forEach((t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
  });
  return (
    <>
      {POSTERS.map((p, i) => (
        <PosterCard key={p.id} poster={p} texture={textures[i]!} reduced={reduced} />
      ))}
    </>
  );
}

function Dust({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 220;
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      a[i * 3] = (Math.random() - 0.5) * 16;
      a[i * 3 + 1] = (Math.random() - 0.5) * 8 + 1;
      a[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return a;
  }, []);
  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F2A93B"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#0B0A08" roughness={0.75} metalness={0.15} />
    </mesh>
  );
}

function Beam() {
  return (
    <mesh position={[0, 3.2, 5]} rotation={[Math.PI / 2.3, 0, 0]}>
      <coneGeometry args={[4.5, 9, 32, 1, true]} />
      <meshBasicMaterial
        color="#F2A93B"
        transparent
        opacity={0.05}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  useFrame((state) => {
    if (reduced) return;
    const { camera, pointer } = state;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 1.3, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5 + pointer.y * 0.6, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CinemaLobby({ reduced }: { reduced: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.5, 11], fov: 45 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#0B0A08"]} />
      <fog attach="fog" args={["#0B0A08", 9, 24]} />
      <ambientLight intensity={0.3} color="#F5E9D0" />
      <spotLight
        position={[0, 6, 8]}
        angle={0.6}
        penumbra={0.85}
        intensity={120}
        color="#F2A93B"
        distance={38}
      />
      <pointLight position={[0, 2, 6]} intensity={16} color="#F2A93B" distance={22} />
      <pointLight position={[0, 3, -8]} intensity={10} color="#6E7FB0" distance={26} />
      <Beam />
      <Suspense fallback={null}>
        <Posters reduced={reduced} />
      </Suspense>
      <Dust reduced={reduced} />
      <Ground />
      <Rig reduced={reduced} />
    </Canvas>
  );
}
