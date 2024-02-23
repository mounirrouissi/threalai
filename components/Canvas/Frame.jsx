import React, { Suspense, useEffect, useRef } from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { isMobile } from './../../config/helpers';

import { CameraControls, Decal, Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import state from '../../store';
import { useRouter } from 'next/navigation';
import { degToRad } from 'three/src/math/MathUtils';

const Frame = ({imageUrl}) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/frame.glb');
  const customImageTexture = useTexture('/img/25231.png');
  //const logoTexture = useTexture(snap.logoDecal);
  const image =localStorage.getItem("imageUrl")
  const logoTexture = useTexture(image);


  const fullTexture = useTexture(snap.fullDecal);
	
  const meshRef = useRef();

  useEffect(() => {
    console.log("imageUrl inside Frame=" + imageUrl);
  });

  useFrame((state, dt) => {
    // meshRef.current.material.zoom = 0 + Math.sin(state.clock.elapsedTime / 3) / 2;
    
    // easing.dampC(meshRef.current.material.color, hovered ? 'orange' : 'white', 0.1, dt);
  });

  return (
    <>
        {/* <spotLight
    intensity={0.9} angle={0.1} penumbra={1} position={[10,15,10]} castShadow
    /> */}
      {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} rotation={THREE.Euler} rotateSpeed={0.2}></OrbitControls> */}
      <group key={snap}  >
        <group scale={0.02} position={[0,-0.1,0]}  >
          <group  rotation={[Math.PI / 2, -Math.PI / 2, 0]}>
            <mesh  castShadow geometry={nodes.Frame_Frame1_0.geometry} material={materials.Frame1}  />
            <mesh geometry={nodes.Wood_Wood1_0.geometry}    scale={0.1} position={[0.391, 0.031, 0.227]} />
            <mesh
        material-roughness={0}

              position={[10.099, -0.187, 5.9]}
 rotation={[0, Math.PI / 2, 0]}
              geometry={nodes.Paper_Paper1_0.geometry}
 dispose={null}
            >

            <meshBasicMaterial opacity={0} transparent={false}
            >

</meshBasicMaterial>
            <Decal

anisotropy={16}
depthTest={true }
depthWrite={true}
position={[6.081 - 0.4, 17.095, 0.32]}  rotation={[-1, 0, 0]}
scale={[18 * 1.1, 22.59]}  // Increased the width of the logoTexture
>


            <planeGeometry/>
              <meshBasicMaterial
                attach="material"
                map={logoTexture}
             
                polygonOffset

              />
              </Decal>
            </mesh>
            {/* <mesh geometry={nodes.Plexiglass_Plexiglass1_0.geometry} material={materials.Plexiglass1} position={[-6.611, 7.515, 1.174]} /> */}
          </group>
        </group>
      </group>
      <Environment preset='city'/>
    </>
  );  
};
 
export default Frame;
