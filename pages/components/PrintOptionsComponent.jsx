'use client'
import React, { useState } from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { useSnapshot } from 'valtio';
import state from '../../store'
import { set } from 'valtio';
import Header from "@/components/Header";
import Loading from '@/components/Loading'
import { useRouter } from "next/navigation";

export default function PrintOptionsComponent() {
  const [loading,setLoading] = useState(false)
  const [selectedColorClothes, setSelectedColorClothes] = useState('#f3f4f6'); // Default color for Clothes
  const [colorIndexClothes, setColorIndexClothes] = useState(0); // Index to cycle through colors for Clothes
const snap = useSnapshot(state); // Subscribe to state changes
  const [selectedColorPhones, setSelectedColorPhones] = useState('#f3f4f6'); // Default color for Phones
  const [colorIndexPhones, setColorIndexPhones] = useState(0); // Index to cycle through colors for Phones
  const router = useRouter();

  // const colors = ['#f3f4f6', '#e0e0e0', '#c0c0c0', '#a0a0a0', '#808080', '#000000']; // Example colors

  const colors = ['black','white','blue','red','green', 'yellow', 'purple', 'pink']; // Add your colors here

  // Function to handle color selection
  const handleColorSelect = (color, type) => {
    console.log("selected color:", color);
    console.log("selected type:", type);
    state.selectedColor = color; // Update the state directly
     state.selectedType = type; // Update the state directly
     state.intro =true
    // setColor(color);
    router.push(`/Home`);
    setLoading(true)
  };

  // Function to handle color change with arrows for Clothes
  const handleColorChangeClothes = (direction) => {
    const newIndex = direction === 'next' ? colorIndexClothes +   1 : colorIndexClothes -   1;
    if (newIndex >=   0 && newIndex < colors.length) {
      setColorIndexClothes(newIndex);
      setSelectedColorClothes(colors[newIndex]);
    }
  };

  // Function to handle color change with arrows for Phones
  const handleColorChangePhones = (direction) => {
    const newIndex = direction === 'next' ? colorIndexPhones +   1 : colorIndexPhones -   1;
    if (newIndex >=   0 && newIndex < colors.length) {
      setColorIndexPhones(newIndex);
      setSelectedColorPhones(colors[newIndex]);
    }
  };
  const handleFameSelected = (direction) => {
    state.selectedType = 'Frame'; // Update the state directly
    router.push(`/Home`);

  }

  


  // Function to render a row of three colors
    // Function to render a row of three colors
    const renderColorRow = (startIndex, type) => {
      return colors.slice(startIndex, startIndex +   3).map((color, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: color,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            margin: '0   5px',
            cursor: 'pointer',
            transition: 'transform   0.3s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
          onClick={() => handleColorSelect(color, type)}
        />
      ));
    };

  return (
    <div className="">
    <Header />
  { loading ? <Loading/> : 
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap:   4, p:   5 }}>
       
        {/* tshirt Box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh', // Adjust the height as needed
            width:'50vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => (state.intro = false)} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./img/t-shirt.svg'} alt="Phone Accessories Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Tshirt
            </Typography>
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   5 }}>
          <IconButton 
  className="text-3xl sm:text-5xl"
  onClick={() => handleColorChangePhones('prev')}
>
  <ArrowBackIos />
</IconButton>

<IconButton
  className="text-3xl sm:text-5xl" 
  onClick={() => handleColorChangePhones('next')} 
>
  <ArrowForwardIos />  
</IconButton>

            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexPhones,'Tshirt')}
            </Box>
            <IconButton
  className="text-3xl sm:text-5xl" 
  onClick={() => handleColorChangePhones('next')} 
>
  <ArrowForwardIos />  
</IconButton>
          </Box>
        </Box>
        {/* hoodie Box */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh', // Adjust the height as needed
            width:'50vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => (state.intro = false)} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./img/hoodie-solid-color-clothing.png'} alt="Clothes Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Hoodie
            </Typography>
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   5 }}>
            <IconButton onClick={() => handleColorChangeClothes('prev')}>
              <ArrowBackIos />
            </IconButton>
            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexClothes,'Hoodie')}
            </Box>
            <IconButton onClick={() => handleColorChangeClothes('next')}>
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      
         {/* frame Box */}
        <Box
          onClick={() => {handleFameSelected()}}

          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '70vh', // Adjust the height as needed
            width:'50vh',
            m:   1,
            p:   1,
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0   10px   15px -3px rgba(0,   0,   0,   0.1),   0   4px   6px -2px rgba(0,   0,   0,   0.05)',
            transition: 'transform   0.5s',
            '&:hover': {
              transform: 'scale(0.95)',
            },
          }}
        >
          <Link
      
            onClick={() => {state.intro = false}} // Make sure 'state' is defined in your component or context
            sx={{
              flex: '1   0 auto',
              width: '100%', // Ensure the link takes the full width of the parent Box
              position: 'relative',
            }}
          >
            <img src={'./images/frame.jpg'} alt="Clothes Image" style={{ width: '100%', objectFit: 'cover' }} />
            <Box
              sx={{
                position: 'absolute',
                top:   0,
                bottom:   0,
                left:   0,
                right:   0,
                background: 'linear-gradient(to top, rgba(0,   0,   0,   0.7), transparent)',
                transition: 'background   0.5s',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom:   0,
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.25rem',
                p:   0.5,
                color: '#ffffff',
              }}
            >
              Clothes
            </Typography>
            
          </Link>
          <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
       
          </Box>
          {/* <Typography variant="subtitle1" sx={{ marginTop:   2, textAlign: 'center' }}>
            Choose a color
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop:   2 }}>
            <IconButton onClick={() => handleColorChangeClothes('prev')}>
              <ArrowBackIos />
            </IconButton>
            <Box sx={{ display: 'flex', gap:   2 }}>
              {renderColorRow(colorIndexClothes,'Frame')}
            </Box>
            <IconButton onClick={() => handleColorChangeClothes('next')}>
              <ArrowForwardIos />
            </IconButton>
          </Box> */}
        </Box>
      </Box>}
    </div>
  );
}