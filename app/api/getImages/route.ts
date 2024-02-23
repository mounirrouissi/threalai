export const dynamic = "force-dynamic";
type ImageType = {
  name: string;
  url: string;
};

export async function GET(request: Request) {


  
    // (bucket?: string,bucketPublicUrl:string=""): Promise<ImageType[]> {
  // console.log("Fetching images from bucket: ", bucket);
  const bucket ='print'
  let allImages: ImageType[] = [];
  const imageUrls = [];

  const bucketUrl = `https://api.cloudflare.com/client/v4/accounts/1079414e72226b3a1f5d5d5fc0adc423/r2/buckets/${bucket}/objects`;

  const workerUrl=  "https://production.print.mounirrouissi2.workers.dev"
  // console.log("Fetching images from bucket: ", workerUrl)
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

//  construct list of images

    try {
      const results = await Promise.all(
        data.result.map((item: any, index: number) => {
          console.log("item =", JSON.stringify(item) + " at index =", index);
          const imageUrl = `${workerUrl}/${item.key}`;
          console.log(imageUrl);
          imageUrls.push({ imageUrl})
          return {
            name: takoutSpace(item.key),
            url: imageUrl,
          };
        })
      );
      allImages = results.slice(0, 15);

    } catch (error) {
      console.error('Error fetching images child ', error);
    }
 } catch (error) {
    console.log('Error fetching images parent: ', error);
 }

//  console.log('All images BEFORE SORTTING TO IMAGES COMPONENT: ', allImages);
 sortedImageUrls(allImages)
//  console.log('All images AFter SORTTING  TO IMAGES COMPONENT: ', allImages);

 return new Response(JSON.stringify(allImages), {
  status: 200,
})




function sortedImageUrls(allImages: ImageType[]): ImageType[] {
  return allImages.sort((a, b) => {
    const timestampA = parseInt(a.name.split('_')[1], 10);
    const timestampB = parseInt(b.name.split('_')[1], 10);
    return timestampB - timestampA; // Sort by ascending order of timestamps
  });

  
}
function takoutSpace(prmpt: string): string {
  return prmpt.trim().replace(/%20/g, ' ');
}

}
