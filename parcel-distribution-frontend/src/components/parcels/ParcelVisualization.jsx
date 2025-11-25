import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const ParcelBox = ({ size, color, position, rotationSpeed }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
      
      <ParcelBox 
        size={[1, 0.5, 0.5]} 
        color="#3b82f6" 
        position={[-2, 0, 0]}
        rotationSpeed={0.5}
      />
      <ParcelBox 
        size={[1.2, 0.8, 0.8]} 
        color="#10b981" 
        position={[0, 0, 0]}
        rotationSpeed={0.3}
      />
      <ParcelBox 
        size={[1.5, 1, 1]} 
        color="#f59e0b" 
        position={[2, 0, 0]}
        rotationSpeed={0.2}
      />
      
      <Sparkles count={100} scale={10} size={2} speed={0.3} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
};

const ParcelVisualization = () => {
  return (
    <div className="w-full h-64 rounded-lg overflow-hidden glass">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default ParcelVisualization;