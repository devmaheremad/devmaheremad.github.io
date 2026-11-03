"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

type Power = MutableRefObject<number>;
type TransmissionMat = THREE.MeshPhysicalMaterial & {
  chromaticAberration: number;
  distortion: number;
  temporalDistortion: number;
};

const FONT = "/fonts/syne-800.woff";

// A glass knot floating in front of the name. The glass refracts the text behind it; pressing and holding
// "overdrives" it: faster spin, stronger chromatic aberration and distortion.
function Core({ power }: { power: Power }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const mat = useRef<TransmissionMat>(null!);
  const { viewport } = useThree();
  const narrow = viewport.aspect < 1;
  const base = narrow ? viewport.width / 5 : Math.min(0.82, viewport.width / 8.5);

  useFrame((state, dt) => {
    const p = power.current;
    const m = mesh.current;
    m.rotation.x += dt * (0.12 + p * 2.4);
    m.rotation.y += dt * (0.18 + p * 3.2);
    m.position.x = THREE.MathUtils.damp(m.position.x, state.pointer.x * 0.55, 2.6, dt);
    m.position.y = THREE.MathUtils.damp(m.position.y, state.pointer.y * 0.35, 2.6, dt);
    const breathe = Math.sin(state.clock.elapsedTime * 1.4) * 0.015;
    m.scale.setScalar(base * (1 + breathe + p * 0.22));
    if (mat.current) {
      mat.current.chromaticAberration = 0.08 + p * 1.1;
      mat.current.distortion = 0.3 + p * 1.4;
      mat.current.temporalDistortion = 0.08 + p * 0.7;
    }
  });

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[1, 0.33, 256, 40]} />
      <MeshTransmissionMaterial
        ref={mat as never}
        backside
        backsideThickness={0.6}
        samples={6}
        resolution={512}
        thickness={1.1}
        roughness={0.04}
        ior={1.35}
        anisotropicBlur={0.15}
        chromaticAberration={0.08}
        distortion={0.3}
        distortionScale={0.45}
        temporalDistortion={0.08}
        color="#eef6ff"
      />
    </mesh>
  );
}

function Backdrop({ power }: { power: Power }) {
  const { viewport } = useThree();
  const group = useRef<THREE.Group>(null!);
  const size = viewport.aspect < 1 ? viewport.width / 3.9 : Math.min(viewport.width / 5.2, viewport.height / 2.4);
  useFrame((state, dt) => {
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, -state.pointer.x * 0.25, 2, dt);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, -state.pointer.y * 0.12, 2, dt);
    const s = 1 + power.current * 0.04;
    group.current.scale.setScalar(s);
  });
  return (
    <group ref={group} position={[0, 0, -2.4]}>
      <Text font={FONT} fontSize={size} letterSpacing={-0.04} color="#ecebe6" anchorX="center" anchorY="middle" position={[0, size * 0.42, 0]}>
        MAHER
      </Text>
      <Text font={FONT} fontSize={size * 0.42} letterSpacing={0.02} color="#4cc3ff" anchorX="center" anchorY="middle" position={[0, -size * 0.42, 0]}>
        FRONTEND
      </Text>
    </group>
  );
}

// Seeded positions, computed once when the module loads, so rendering stays pure.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const SPARK_POSITIONS = (() => {
  const rand = seeded(7);
  const n = 420;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (rand() - 0.5) * 16;
    pos[i * 3 + 1] = (rand() - 0.5) * 9;
    pos[i * 3 + 2] = -1 - rand() * 6;
  }
  return pos;
})();

function Sparks({ power }: { power: Power }) {
  const points = useRef<THREE.Points>(null!);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(SPARK_POSITIONS, 3));
    return g;
  }, []);
  useFrame((_, dt) => {
    points.current.rotation.z += dt * (0.01 + power.current * 0.25);
  });
  return (
    <points ref={points} geometry={geo}>
      <pointsMaterial size={0.018} color="#b69cff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function HeroScene({ power, active }: { power: Power; active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 34 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#07070a"]} />
      <Backdrop power={power} />
      <Sparks power={power} />
      <Core power={power} />
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="ring" color="#4cc3ff" intensity={8} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={4} />
          <Lightformer form="ring" color="#b69cff" intensity={8} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
        </group>
      </Environment>
    </Canvas>
  );
}
