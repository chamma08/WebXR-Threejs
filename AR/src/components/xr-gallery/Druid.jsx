import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useCharacterAnimations } from "../contexts/CharacterAnimations";

export default function Druid(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/model2.gltf");
  const { actions,names } = useAnimations(animations, group);
  const {setAnimations,animationIndex,Color} = useCharacterAnimations();

  useEffect(() => {
    setAnimations(names);
  }, [])

  useEffect(() => {
    actions[names[animationIndex]].reset().fadeIn(0.5).play();

    return () => {
      actions[names[animationIndex]]?.fadeOut(0.5);
    }
  }, [animationIndex]);
  

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.91}>
        <primitive object={nodes.root} />
        <skinnedMesh
          geometry={nodes.druid.geometry}
          material={materials.color_main}
          skeleton={nodes.druid.skeleton}
          material-color={Color}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/model2.gltf");


























/*import { useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const Model2 = ({position}) => {
  const gltf = useLoader(GLTFLoader, "/models/model2.gltf");
  return (
    <Suspense fallback={null}>
      <primitive position={position} object={gltf.scene} />
    </Suspense>
  )
}

export default Model2*/
