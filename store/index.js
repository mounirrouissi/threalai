import { proxy } from 'valtio';

const state = proxy({
  type:"Tshirt",
  intro: false,
  colors: ['#ccc', '#EFBD4E', '#80C670', '#726DE8', '#EF674E', '#353934'],
  color: '#353934',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  selectedColor: "", // Default color
  selectedType: 'Tshirt', // Default color
});

export default state;