import { swatch, fileIcon, ai, logoShirt, logoFrame } from "./../public/images";


export const EditorTabs = [
  // {
  //   name: "colors",
  //   icon: "/images/swatch.png", // Corrected path

  // },
  {
    name: "filepicker",
     icon: "/images/size-guide.png", // Corrected path

  },
 /*  {
    name: "aipicker",
      icon: "/images/ai.png", // Corrected path

  }, */
];

export const FilterTabs = [
  {
    name: "Tshirt",
      icon: "/images/logo-tshirt.png", // Corrected path

  },
  {
    name: "Hoodie",
     icon: "/images/hoodie.png", // Corrected path

  },
  {
    name: "Frame",
     icon: "/images/frame.jpg", // Corrected path

  },
];



// feature-texture

export const DecalTextures = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "logoFrame",
  },
};

export const DecalTypes = {
  tshirt: {
    stateProperty: "logoDecal",
    filterTab: "Tshirt",
  },
  hoodie: {
    stateProperty: "logoDecal",
    filterTab: "Hoodie",
  },
};

