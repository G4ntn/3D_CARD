'use client';

import './index.css';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer } from '@react-three/drei';

const GLTF_PATH = '/assets/gencard.glb';

useGLTF.preload(GLTF_PATH);

export default function App() {
  return (
    <div className="responsive-wrapper" style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <Band />
        <Environment background blur={0.75}>
          <color attach="background" args={['black']} />
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band() {
  const { scene } = useGLTF(GLTF_PATH);

  return (
    <group position={[0, 0, 0]} scale={2.25}>
      <primitive object={scene} />
    </group>
  );
}
