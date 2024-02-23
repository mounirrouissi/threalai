import React, { useState } from 'react'
import { SketchPicker,TwitterPicker } from 'react-color'
import { useSnapshot } from 'valtio'


import state from '../../store';
import { getContrastingColor } from '../../config/helpers';


const ColorPicker = () => {
  const snap = useSnapshot(state);
// State to manage the visibility of the color picker
var inputStyles = {
  input: {
    border: '10',
    
  },
  label: {
    fontSize: '12px',
    color: '#ddd',
  },
};
  return (
    <div className="absolute left-full ml-3 mb-12">
      

        <TwitterPicker
  style={ inputStyles }
          
          colors={snap.colors}
          // colors={['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00', '#A4DD00', ]}
          // '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF', '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400', 
          // '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF', '#000000', '#666666', '#B3B3B3', '#9F0500',
          //  '#C45100', '#FB9E00', '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E']}
          color={snap.color}
          disableAlpha
          onChange={(color) => state.color = color.hex}
          

        />
       
    </div>
  )
}

export default ColorPicker