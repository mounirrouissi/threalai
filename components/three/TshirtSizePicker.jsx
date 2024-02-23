import React, { useEffect, useState } from 'react';

const TshirtSizePicker = ({tshirtNumber,tshirtSize,handleSaveOptions}) => {
    const [selectedSize, setSelectedSize] = useState('');
    const [shirtCount, setShirtCount] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

  const sizes = ['S', 'M', 'L', 'XL'];

  const handleSelectOption=(size)=>{
    setSelectedSize(size);
  }

  const handleCountChange = (event) => {
    setShirtCount(event.target.value);
  }


useEffect(() => {
    console.log("tshirtNumber"+tshirtNumber)
    console.log("tshirtSize"+tshirtSize)
    if(tshirtNumber && tshirtSize){
        setSelectedSize(tshirtSize)
        setShirtCount(tshirtNumber)
    }
}, [])
  return (
    <>
{isOpen && (
     <div className="filepicker-container bg-gray-100 h-fit  relative">
  <div className="flex-1 flex flex-col items-center mb-4  ">
    <div className="mb-2 ">
      <label htmlFor="shirtCount" className="block text-sm font-medium text-gray-700">Number of T-Shirts</label>
      <input
        type="number"
        id="shirtCount"
        value={shirtCount}
        onChange={handleCountChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <ul className="flex-1 flex flex-row  space-x-2  mb-2">
          {sizes.map((size, index) => (
            <li
              key={index}
              className={`p-2 h-fit rounded shadow ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => {handleSelectOption(size)}}
            >
              {size}
            </li>
          ))}
        </ul>
        <button
        disabled ={shirtCount < 1}
  onClick={()=>{handleSaveOptions(shirtCount,selectedSize);setIsOpen(!isOpen) }}
  className={`absolute bottom-0 right-0 mr-1  rounded-full  bg-green-500 text-white p-1 shadow-lg flex items-center justify-center mt-2 ${shirtCount < 1 ? "opacity-50 disabled" : ""} `}
>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-3 w-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
  <span className={`text-xs ${shirtCount < 1 ? "opacity-50 disabled" : ""}`}  >Confirm</span>

</button>
  </div>
 

</div>)}
</>
  );
};

export default TshirtSizePicker;