import { NextRequest, NextResponse } from "next/server";
import { Buffer } from 'buffer';
import fs from 'fs';
import { NextApiResponse } from "next";
interface Data {
  message?: string;
}
export  async function POST(req: NextRequest, res: NextApiResponse<Data>) {

  console.log("uploading data to cloudflare inside post");
  const { image,prompt } = await req.json();
  //const blob = base64ToBlob(image, "image/png");


  let binary: Buffer = Buffer.alloc(0);
    try {
     binary = await urlToBinary(image);
     fs.writeFileSync('output.bin', binary);
  } catch (err) {
     console.error(err);
  }


  function generateRandomString() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + '_' + Date.now();
  }

// const key = generateRandomString();
const key =  prompt + '_' + Date.now();

  console.log("key: " + key)


  if (!image) {
    return new Response("Missing image", { status: 400 });
  }

  try {   
    
    const response = await fetch(`https://print.mounirrouissi2.workers.dev/${key}`, {
        method: "PUT",
        headers: {  
          "X-CF-Secret": "123456",
          "Content-Type": "application/octet-stream"
        },
        body:binary,

      });

      if (!response.ok) {
        throw new Error(`uploading : HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log("data: " + data); 
      return new NextResponse(data, { status: 201 })

    }  catch (error) {
        console.error('Fetch error: ', error);
        return res.status(500).json({ message: "An error occurred while uploading the image" });

      }

   
}

// Define a function to convert an image URL to a base64 string
async function urlToBinary(url:string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
 }

// Call the function with your image URL
