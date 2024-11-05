import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProjectPointProps {
  position: [number, number, number];
  color: string;
  label: string;
  description: string;
  tech: string;
  year: string;
}

export const ProjectPoint = ({ position, color, label, description, tech, year }: ProjectPointProps) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const lineRef = useRef<THREE.Line>(null);
  const pointRef = useRef<THREE.Mesh>(null);
  
  const normalizedPosition = new THREE.Vector3(...position).normalize().multiplyScalar(1.2);
  const startPosition = new THREE.Vector3(...position).normalize();
  
  useFrame(({ clock }) => {
    if (!lineRef.current || !visible) return;
    
    const time = clock.getElapsedTime();
    const progress = Math.min(1, time * 0.5);
    
    if (pointRef.current) {
      pointRef.current.position.lerp(normalizedPosition, progress);
    }
    
    // Update line vertices
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
    const currentPoint = new THREE.Vector3().lerpVectors(startPosition, normalizedPosition, progress);
    positions[3] = currentPoint.x;
    positions[4] = currentPoint.y;
    positions[5] = currentPoint.z;
    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  setTimeout(() => setVisible(true), Math.random() * 1000);

  return (
    <group>
      {visible && (
        <>
          <line ref={lineRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([
                  startPosition.x, startPosition.y, startPosition.z,
                  startPosition.x, startPosition.y, startPosition.z,
                ])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} transparent opacity={0.5} />
          </line>
          
          <mesh
            ref={pointRef}
            position={startPosition}
            onPointerEnter={(e) => {
              e.stopPropagation();
              setHovered(true);
              document.body.style.cursor = 'pointer';
            }}
            onPointerLeave={(e) => {
              e.stopPropagation();
              setHovered(false);
              document.body.style.cursor = 'auto';
            }}
          >
            <sphereGeometry args={[0.02, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 0.5 : 0.2}
            />
          </mesh>

          {hovered && (
            <Html
              position={normalizedPosition.clone().multiplyScalar(1.1)}
              center
              transform
              occlude
              style={{
                transition: 'all 0.2s',
                opacity: hovered ? 1 : 0,
                transform: `scale(${hovered ? 1 : 0.5})`
              }}
            >
              <div className="min-w-64 animate-fade-in rounded-lg bg-black/90 p-4 text-left backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{label}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-300">
                    {year}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-200">{description}</p>
                <div className="rounded-md bg-white/5 p-2">
                  <p className="text-xs text-gray-400">Technologies:</p>
                  <p className="text-sm text-gray-300">{tech}</p>
                </div>
              </div>
            </Html>
          )}
        </>
      )}
    </group>
  );
};