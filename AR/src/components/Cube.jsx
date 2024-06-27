import { OrbitControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

const Cube = () => {
    const cubeRef = useRef();
    useFrame((state, delta) => {
      cubeRef.current.rotation.y += 0.03;
    })
  return (
    <>
      <OrbitControls/>
        <ambientLight intensity={1}/>
        <mesh ref={cubeRef}>
            <boxGeometry args={[2,2,2]}/>
            <meshStandardMaterial color={"mediumpurple"}/>
        </mesh>
    </>
  )
}

export default Cube
