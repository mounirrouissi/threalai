'use client'
import React, { useRef } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Decal, Text, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import state from '../../store';
import { isMobile } from './../../config/helpers';

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/shirt_baked.glb');

  const image =localStorage.getItem("imageUrl")
  const logoTexture = useTexture(image);
  const fullTexture = useTexture(snap.fullDecal);

  const meshRef = useRef();


  console.log("color: " + snap.color)
  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);

      // update the color to the material
    meshRef.current.material.color = materials.lambert1.color;
    meshRef.current.material.needsUpdate = true;

     // Set aoMapIntensity to 0
    materials.lambert1.aoMapIntensity=0;

  });

const stateString = JSON.stringify(snap);

  return (
    <>
    <Center> 
    <group key={snap} scale={isMobile ? 0.8 : 1}>
      <mesh
      ref={meshRef}
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
     {/*    {snap.isFullTexture && (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )} */}

        {snap.isLogoTexture && (
          <Decal 
      
            position={[0, 0.01, 0.2]}
            rotation={[0, 0, 0]}
            scale={0.2}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
    </Center  > 
</>
    
  )
}

export default Shirt
