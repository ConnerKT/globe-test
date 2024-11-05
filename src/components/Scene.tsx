import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Globe } from './Globe';
import { StarField } from './StarField';
import { Suspense } from 'react';

export const Scene = () => {
  return (
    <div className="h-screen w-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 2.5]} fov={60} />
        <Suspense fallback={null}>
          <StarField />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Globe />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI - Math.PI / 4}
            maxDistance={4}
            minDistance={2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};