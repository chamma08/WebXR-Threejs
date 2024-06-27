import { Canvas } from '@react-three/fiber'
import {ARButton, XR} from '@react-three/xr'
import XrOverlay from './XrOverlay'
import { CharacterAnimationsProvider } from '../contexts/CharacterAnimations'
import Interface from './Interface'
import { useCallback, useRef, useState } from 'react'


const XrOverlayContainer = () => {
  const [overlayContent, setOverlayContent] = useState(null);

  let interfaceRef = useCallback((node) => {
    if (node !== null) {
      setOverlayContent(node);
    }
  });
  return (
    <>
      <CharacterAnimationsProvider>
        <ARButton sessionInit={{ requiredFeatures: ["hit-test"],optionalFeatures: ["dom-overlay"],domOverlay: {root:overlayContent} }}/>
        <Canvas>
          <XR>
            <XrOverlay/>
          </XR>
        </Canvas>
        <Interface ref={interfaceRef}/>
      </CharacterAnimationsProvider>
    </>
  )
}

export default XrOverlayContainer
