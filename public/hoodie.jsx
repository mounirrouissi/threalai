/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 hoodie1.glb -o ./hoodie.jsx 
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/hoodie1.glb')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Hooodie" position={[0.176, 1.449, 0.89]} scale={0.099}>
          <mesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials['Hoodie main mat']} />
          <mesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials['Hoodie main mat']} />
          <mesh name="Mesh_2" geometry={nodes.Mesh_2.geometry} material={materials.printable} />
          <group name="Empty" position={[-0.271, 2.083, -8.347]} scale={10.113} />
          <mesh name="2_low" geometry={nodes['2_low'].geometry} material={materials['Hoodie main mat']} position={[-0.09, -2.565, 4.79]} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/hoodie1.glb')
