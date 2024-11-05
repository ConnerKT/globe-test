import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const StarField = () => {
  const starsRef = useRef<THREE.Points>(null);
  const particlesCount = 3000;
  
  const [positions, sizes, speeds] = useMemo(() => {
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const speeds = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Create a sphere of stars
      const radius = 5 + Math.random() * 5; // Stars between radius 5 and 10
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = Math.random() * 0.02 + 0.01;
      speeds[i] = Math.random() * 0.02;
    }
    
    return [positions, sizes, speeds];
  }, []);
  
  useFrame(({ clock }) => {
    if (!starsRef.current) return;
    const time = clock.getElapsedTime();
    
    const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
    const sizes = starsRef.current.geometry.attributes.size.array as Float32Array;
    
    for (let i = 0; i < particlesCount; i++) {
      // Twinkle effect
      const twinkle = Math.sin(time * speeds[i]) * 0.5 + 0.5;
      sizes[i] = (Math.random() * 0.01 + 0.01) * (twinkle + 0.5);
      
      // Subtle movement
      const i3 = i * 3;
      positions[i3 + 1] += Math.sin(time * speeds[i]) * 0.001;
      positions[i3] += Math.cos(time * speeds[i]) * 0.001;
    }
    
    starsRef.current.geometry.attributes.position.needsUpdate = true;
    starsRef.current.geometry.attributes.size.needsUpdate = true;
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particlesCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          varying float vAlpha;
          
          void main() {
            vAlpha = size * 50.0;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying float vAlpha;
          
          void main() {
            float r = 0.0, delta = 0.0, alpha = 1.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            alpha = 1.0 - smoothstep(0.8, 1.0, r);
            gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vAlpha);
          }
        `}
      />
    </points>
  );
};