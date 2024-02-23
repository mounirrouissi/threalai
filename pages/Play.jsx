

import Layout from '../components/Layout';
import Canvas from '../components/Canvas'
import Customizer from './components/Customizer';
import { useRouter } from 'next/router';
import FaqList from '../components/FaqList';
import React, { useEffect, useState } from 'react';


export default function HomePage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    // Retrieve the image URL from localStorage after the component mounts
    const storedImageUrl = localStorage.getItem('imageUrl');
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }
    console.log("Image URL from localStorage:", storedImageUrl);
  }, []);

  return (
    <Layout>
      <Canvas />
      <Customizer  />
    </Layout>
  );
}



