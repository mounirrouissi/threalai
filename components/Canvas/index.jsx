"use client"
import { Canvas } from '@react-three/fiber'
import { Environment, Center,Text, OrbitControls } from '@react-three/drei';

import * as THREE from 'three';

import Shirt from './Shirt';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import { useSnapshot } from 'valtio';
import state from './../../store';
import Frame from './Frame';
import  Hoodie  from './Hoodie';
import { isMobile } from './../../config/helpers';

const CanvasModel = () => {
  const snap = useSnapshot(state);



  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in md:h-[50vh]"
    >
      {/* <ambientLight intensity={0.5} /> */}
      <Environment preset="city" />
      <OrbitControls   ></OrbitControls>

       <CameraRig>
        {/* <Backdrop />  */}
         {/* <Center> */}
           { state.type === "Tshirt" ? <Shirt   /> : (state.type === "Hoodie" ? <Hoodie/> : <Frame/>)} 
         {/* </Center> */}
      </CameraRig>
    </Canvas>
)}

export default CanvasModel