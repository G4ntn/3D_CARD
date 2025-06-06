'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Lightformer } from '@react-three/drei';

const GLTF_PATH = '/assets/gencard.glb';

useGLTF.preload(GLTF_PATH);

export default function App() {
  return (
    <div className="responsive-wrapper">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Band />
        <Environment background blur={0.75}>
          <color attach="background" args={['black']} />
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band() {
  const { nodes } = useGLTF(GLTF_PATH);
  const { width, height } = useThree((state) => state.size);
  
  useEffect(() => {
    console.log('GLTF nodes:', nodes);
    if (nodes.card && nodes.card.geometry) {
      nodes.card.geometry.computeBoundingBox();
      console.log('Card bounding box:', nodes.card.geometry.boundingBox);
    } else {
      console.warn('Card node or geometry not found!');
    }
  }, [nodes]);

  return (
    <>
      {/* Debug red cube at origin */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Try rendering card geometry */}
      {nodes.card && nodes.card.geometry ? (
        <mesh geometry={nodes.card.geometry} position={[0, 0, 0]} scale={1}>
          <meshStandardMaterial color="orange" />
        </mesh>
      ) : (
        <></>
      )}

      {/* Also try rendering other nodes to test */}
      {nodes.clip && nodes.clip.geometry && (
        <mesh geometry={nodes.clip.geometry} position={[3, 0, 0]} scale={1}>
          <meshStandardMaterial color="blue" />
        </mesh>
      )}
      {nodes.clamp && nodes.clamp.geometry && (
        <mesh geometry={nodes.clamp.geometry} position={[-3, 0, 0]} scale={1}>
          <meshStandardMaterial color="green" />
        </mesh>
      )}
    </>
  );
}
