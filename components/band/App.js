'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
// Physics imports commented out temporarily to disable physics
// import { Physics, RigidBody, useRopeJoint, useSphericalJoint, BallCollider, CuboidCollider } from '@react-three/rapier'; 
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/gencard.glb';
const TEXTURE_PATH = '/assets/bandd.png';

useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);

export default function App() {
  return (
    <div className="responsive-wrapper">
      <Canvas camera={{ position: [0, 0, 15], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* Physics temporarily disabled */}
        {/* <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}> */}
          <Band />
        {/* </Physics> */}
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
  // refs removed for physics joints since physics is disabled now
  const { nodes } = useGLTF(GLTF_PATH);

  // Debug mesh to confirm camera view
  // Also place the card at origin, scale 1
  return (
    <>
      {/* Debug red cube at origin */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* The card mesh inside a simple group and mesh */}
      <group scale={1} position={[0, 0, 0]}>
        <mesh geometry={nodes.card.geometry}>
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
    </>
  );
}
