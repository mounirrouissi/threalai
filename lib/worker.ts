

type ImageType = {
  name: string;
  url: string;
};

/* 
export const downloadImages = async (startNumber, endNumber,worker,image) => {
    let allImages :ItemData[]= [];
    for (let i = startNumber; i <= endNumber; i++) {
      let url = `${worker}/${image}`;
      let filePath = '';
      if (FileSystem.documentDirectory !== null) {
       filePath = FileSystem.documentDirectory + Date.now() + '.jpg';
      } else {
       console.error('FileSystem.documentDirectory is null');
      }
      try {
        let { uri } = await FileSystem.downloadAsync(url, filePath);
        allImages.push({
          _id: "imageId_" + i, // Replace with actual id
          name: image,
          mainImage: uri,
          title: "title_" + i, // Replace with actual title
        });
      } catch (error) {
        break;
      }
    }
    return allImages;
    
   };


   import { v4 as uuidv4 } from 'uuid';
 */



 
 
 // Make a GET request to the bucket URL
 export async function fetchImagesR2(bucket?: string,bucketPublicUrl:string="https://production.print.mounirrouissi2.workers.dev"): Promise<ImageType[]> {
  // console.log("Fetching images from bucket: ", bucket);
  bucket ='print'
  let allImages: ImageType[] = [];

  const bucketUrl = `https://api.cloudflare.com/client/v4/accounts/1079414e72226b3a1f5d5d5fc0adc423/r2/buckets/${bucket}/objects`;

  // console.log("Fetching images from bucket: ", bucket)
  try {
    const response = await fetch(bucketUrl, {
      method: 'GET',
      headers: {
        'X-Auth-Email': 'mounirrouissi2@gmail.com',
        'X-Auth-Key': '71c3ca34b001567adf52c9f6315d95b0d2d61',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("result =", JSON.stringify(data.result));

    try {
      const results = await Promise.all(
        data.result.map((item: any, index: number) => {
          console.log("item =", JSON.stringify(item) + " at index =", index);
          const imageUrl = `${bucketPublicUrl}/${item.key}`;
          console.log(imageUrl);

          return {
            name: item.key,
            url: imageUrl,
          };
        })
      );
      allImages = results;
      console.log('All images: ', allImages);
      return allImages;
    } catch (error) {
      console.error('Error fetching images child ', error);
    }
 } catch (error) {
    console.log('Error fetching images parent: ', error);
 }
 return allImages;
}
 