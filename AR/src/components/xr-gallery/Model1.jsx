import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useCharacterAnimations } from '../contexts/CharacterAnimations';


export default function Model1(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/model1.gltf")
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
      <group rotation={[0, 0.48, 0,]} scale={0.15} >
        <primitive object={nodes.root} />
        <skinnedMesh geometry={nodes.Cavalier.geometry} material={materials['color_main.015']} skeleton={nodes.Cavalier.skeleton} material-color={Color} />
      </group>
      <group scale={0.61} >
        <primitive object={nodes.spine004} />
        <skinnedMesh geometry={nodes.Loup.geometry} material={materials['color_main.002']} skeleton={nodes.Loup.skeleton} material-color={Color}/>
      </group>

    </group>
  )
}

useGLTF.preload("/models/model1.gltf")