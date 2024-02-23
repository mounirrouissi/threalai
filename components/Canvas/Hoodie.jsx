

import React, { useEffect, useRef } from 'react';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Decal, PerspectiveCamera, useGLTF, useTexture } from '@react-three/drei';
import state from '../../store';
import * as THREE from 'three';
import { isMobile } from './../../config/helpers';










const  Hoodie =(props)=> {
    const snap = useSnapshot(state)
    //const logoTexture = useTexture(snap.logoDecal);
    const image =localStorage.getItem("imageUrl")
  const logoTexture = useTexture(image);




    useGLTF.preload('/hoodie2.glb')
    // Create a ref to the mesh you want to apply the decal to
 const meshRef = useRef();


 const { nodes, materials, animations } = useGLTF('/hoodie2.glb')
 useFrame((state, delta) => {


     easing.dampC(materials['Hoodie main mat'].color, snap.color, 0.25, delta)
    

    // materials.FABRIC_3_FRONT_1850.aoMapIntensity=0;
    // meshRef.current.material.color = materials.FABRIC_3_FRONT_1850.color;


    // meshRef.current.material.color = materials.FABRIC_3_FRONT_1850.color;
    });




    const { scene } = useThree();
  // Adjust the scale of the decal here
//   const decalScale = [0.5, 0.5, 0.5]; // Example scale, adjust as needed


  // Adjust the position and orientation of the decal here
  const decalPosition = [0.001, 0.09, 0.19]; // Example position, adjust as needed
  const decalRotation = [0, 0, 0]; // Example rotation, adjust as needed
  const decalScale = [0.1,  0.01,  1]; // Increase scale values to zoom out the logo


    
    return (
        <group ref={meshRef} {...props} dispose={null} position={[0, -0.1, 0]} >
        <group name="Scene">
        <group name="Hooodie" position={[0, 0, 0]} scale={isMobile ? 0.016 : 0.02}>
            <mesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['Hoodie main mat']} />
            <mesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials['Hoodie main mat']} />
            <mesh name="Mesh_2" geometry={nodes.Mesh_2.geometry} material={materials.Printable}  dispose={null}>

            <meshBasicMaterial opacity={0} transparent={true} 
            >

</meshBasicMaterial>
            <Decal
anisotropy={16}
depthTest={true }   
depthWrite={true}
scale={[10,9,13]} // Make the edge of the logoTexture on this mesh straight

>
            {/* <CameraControls  position={[0, 10, 0]} fov={0} /> */}

<planeGeometry  />  
<meshStandardMaterial
          map={logoTexture}

>

</meshStandardMaterial>
</Decal>

            </mesh>
            <group name="Empty" position={[-0.271, 2.083, -8.347]} scale={10.113} />
            <mesh name="2_low" geometry={nodes['2_low'].geometry} material={materials['Hoodie main mat']} position={[-0.09, -2.565, 4.79]} />
          </group>
        </group>
      </group>
    )
    
}

export default Hoodie;



