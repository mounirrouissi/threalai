import React from 'react'
import { useSnapshot } from 'valtio'


import state from '../../store';
import { getContrastingColor } from '../../config/helpers';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const snap = useSnapshot(state);

  const activeStyles = isFilterTab && isActiveTab 
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn  mb-7 ${isFilterTab ? 'rounded-full glassmorphism' : 'rounded-4'}`}
      onClick={handleClick}
      style={activeStyles}
    >
      <div
      //  className="flex flex-col items-center mt-4 justify-center"
       className={` flex flex-col items-center  justify-center ${tab.name === "Frame"? "   mt-2" : ""} `}
       >
        <img
          src={tab.icon}
          alt={tab.name}
          className={`${isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}`}
        />
        {tab.name === "Frame" ? <p className="text-center text-black text-xs font-bold">30 x 40</p> : null}
      </div>
    </div>
  )
}

export default Tab