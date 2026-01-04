
// src/features/canvas/MonolithArtifact.jsx
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Edges, Box } from '@react-three/drei';
import * as THREE from 'three';

// REMOVED: ({ mouse }) prop. We will use state.pointer instead.
const Donut = () => {
  const group = useRef();
  
  // Refs for independent animation parts
  const coreRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const debrisRef = useRef();

  const orientation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e) => {
      const maxTilt = 45; 
      const x = e.gamma ? Math.min(Math.max(e.gamma, -maxTilt), maxTilt) / maxTilt : 0;
      const y = e.beta ? Math.min(Math.max(e.beta, -maxTilt), maxTilt) / maxTilt : 0;
      orientation.current = { x, y };
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    // Check if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (group.current) {
      let targetX, targetY;

      if (isMobile) {
        // MOBILE: Use Gyroscope Data
        targetX = (orientation.current.y * Math.PI) / 3; 
        targetY = (orientation.current.x * Math.PI) / 3;
      } else {
        // DESKTOP: Use R3F Internal Pointer (No props needed!)
        // state.pointer.y and .x are normalized (-1 to 1) automatically
        targetX = (-state.pointer.y * Math.PI) / 3; // Note: Inverted Y usually feels more natural
        targetY = (state.pointer.x * Math.PI) / 3;
      }

      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2, delta);
    }

    // ... (Rest of your animation logic stays the same) ...
    if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.2;
        coreRef.current.rotation.z += delta * 0.1;
        const scale = 1 + Math.sin(t * 1.5) * 0.05;
        coreRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.4;
        ring1Ref.current.rotation.y = t * 0.2;
    }
    if (ring2Ref.current) {
        ring2Ref.current.rotation.x = t * 0.3 + 1;
        ring2Ref.current.rotation.z = -t * 0.5;
    }
    if (ring3Ref.current) {
        ring3Ref.current.rotation.y = -t * 0.6;
        ring3Ref.current.rotation.x = Math.sin(t) * 0.5;
    }
    if (debrisRef.current) {
        debrisRef.current.rotation.y -= delta * 0.5;
        debrisRef.current.position.y = Math.sin(t) * 0.2;
    }
  });

  const MATERIAL_BLACK = new THREE.MeshStandardMaterial({
      color: "#111111", roughness: 0.2, metalness: 0.8,
  });
  const MATERIAL_WHITE = new THREE.MeshStandardMaterial({
      color: "#ffffff", roughness: 0.1, emissive: "#ffffff", emissiveIntensity: 0.2,
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={coreRef}>
            <Icosahedron args={[1.2, 0]}>
                <meshStandardMaterial color="#050505" roughness={0.0} metalness={1.0} />
                <Edges scale={1.05} threshold={15} color="white" />
            </Icosahedron>
        </group>
        <group ref={ring1Ref}>
            <Torus args={[1.8, 0.05, 16, 100]}><primitive object={MATERIAL_WHITE} /></Torus>
        </group>
        <group ref={ring2Ref}>
            <Torus args={[2.3, 0.03, 16, 100]}><primitive object={MATERIAL_WHITE} /></Torus>
        </group>
         <group ref={ring3Ref}>
            <Torus args={[2.8, 0.02, 16, 100]}><primitive object={MATERIAL_WHITE} /></Torus>
        </group>
        <group ref={debrisRef}>
            <Box args={[0.2, 0.2, 0.2]} position={[3, 1, 0]}><primitive object={MATERIAL_BLACK} /><Edges color="#555555" /></Box>
            <Box args={[0.15, 0.15, 0.15]} position={[-2.5, -1.5, 1]}><primitive object={MATERIAL_BLACK} /><Edges color="#555555" /></Box>
            <Box args={[0.1, 0.1, 0.1]} position={[0, 2.5, -1.5]}><primitive object={MATERIAL_WHITE} /></Box>
        </group>
      </Float>
    </group>
  );
};

export default Donut;