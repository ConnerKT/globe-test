import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Points } from './Points';

export const Globe = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1, 64, 64]}>
        <meshPhongMaterial
          color="#1e40af"
          transparent
          opacity={0.3}
          wireframe
        />
      </Sphere>
      <Points />
    </group>
  );
};