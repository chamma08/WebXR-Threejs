import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const XrCube = () => {
    const cubeRef = useRef();
    useFrame((state, delta) => {
      cubeRef.current.rotation.y += 0.01;
    })
  return (
    <>
      <OrbitControls/>
        <ambientLight intensity={1}/>
        <mesh ref={cubeRef}  position-z={-5}>
            <boxGeometry args={[2,2,2]}/>
            <meshStandardMaterial color={"mediumpurple"}/>
        </mesh>
    </>
  )
}

export default XrCube
