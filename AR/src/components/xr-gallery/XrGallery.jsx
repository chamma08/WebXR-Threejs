import React, { Fragment, useRef, useState } from 'react'
import { OrbitControls } from '@react-three/drei'
import { Interactive, useHitTest, useXR } from '@react-three/xr';
import { useThree } from '@react-three/fiber';
import { useCharacterAnimations } from '../contexts/CharacterAnimations';
import Druid from './Druid';
import Model1 from './Model1';
import Model3 from './Model3';


const XrGallery = () => {
  const reticleRef = useRef();
  const [models, setModels] = useState([])

  const {currentModelName} = useCharacterAnimations();

  const {isPresenting} = useXR();

  useThree(({ camera }) => {
    if (!isPresenting) {
      camera.position.z = 3;
    }
  });

  useHitTest((hitMatrix,hit) => {
    hitMatrix.decompose(
      reticleRef.current.position,
      reticleRef.current.quaternion,
      reticleRef.current.scale
    )
    reticleRef.current.rotation.set(-Math.PI/2,0,0) ;
  })

  const placeModel = (e) => {
    let position = e.intersection.object.position.clone();
    let id = Date.now();
    setModels([{id, position}]);
  };

  return (
    <>
      <OrbitControls />
      <ambientLight />
      {isPresenting &&
        models.map(({ position, id }) => {
          return (
            <Fragment key={id}>
              {currentModelName === "druid" && <Druid position={position} />}
              {currentModelName === "Model1" && <Model1 position={position} />}
              {currentModelName === "Model3" && <Model3 position={position} />}
            </Fragment>
          );
        })}
      {isPresenting && (
        <Interactive onSelect={placeModel}>
          <mesh ref={reticleRef} rotation-x={-Math.PI / 2}>
            <ringGeometry args={[0.1, 0.25, 32]} />
            <meshStandardMaterial color={"white"} />
          </mesh>
        </Interactive>
      )}

      {!isPresenting && currentModelName === "druid" && <Druid />}
      {!isPresenting && currentModelName === "Model1" && <Model1 />}
      {!isPresenting && currentModelName === "Model3" && <Model3 />}
    </>
  )
}

export default XrGallery
