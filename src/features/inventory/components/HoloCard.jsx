import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

export default function HoloCard({ img, isActive }) {
  const mesh = useRef()

  const texture = useTexture(img || "/textures/default.png")
  //Dynamic aspect ratio, image distortion ozhivaakkaaan.
  const { width, height } = useMemo(() => {
    if (!texture.image) return { width: 3, height: 3 }
    
    const imgAspect = texture.image.width / texture.image.height
    const MAX_SIZE = 3.5 // The maximum size of the card in 3D units

    let w, h
    if (imgAspect > 1) {
      // Landscape Image
      w = MAX_SIZE
      h = MAX_SIZE / imgAspect
    } else {
      // Portrait or Square Image
      h = MAX_SIZE
      w = MAX_SIZE * imgAspect
    }
    return { width: w, height: h }
  }, [texture])

  useFrame((state, delta) => {
    if (!mesh.current) return

    // FIX 2: STABILIZED ANIMATION
    // Gentle tilt interaction (Apple style)
    const targetX = -state.pointer.x / 5
    const targetY = -state.pointer.y / 5
    
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetX, 4, delta)
    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetY, 4, delta)

    // Gentle scale pop
    const targetScale = isActive ? 1.15 : 1
    mesh.current.scale.setScalar(
      THREE.MathUtils.damp(mesh.current.scale.x, targetScale, 4, delta)
    )
  })

  return (
    <mesh ref={mesh}>
      {/* Apply the calculated dynamic dimensions here */}
      <planeGeometry args={[width, height]} />
      
      <meshPhysicalMaterial
        map={texture}
        transparent={true}    // CRITICAL: Enables transparency
        alphaTest={0.1}      // Helps with crisp edges on transparent PNGs
        roughness={0.2}
        metalness={0.1}
        clearcoat={1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}