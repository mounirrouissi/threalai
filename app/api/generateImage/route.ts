import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest,res:any) {
  const {prompt, size} = await request.json();

  console.log("inside genrate post "+ size)
  const predictionResponse = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer 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`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "dall-e-3", // Updated to DALL-E 3
      "prompt": prompt,
      "n": 1,
      "size": size

    })
  });


  if (predictionResponse.status !==  200) {
    console.log("error while gen images" + predictionResponse.status)
    console.log("error while gen images" + predictionResponse)
    let error = await predictionResponse.json();
console.log("error while gen images"+ JSON.stringify(error)) 
    return new NextResponse(JSON.stringify({ error: "Failed to generate image" }), { status:  500, headers: { 'Content-Type': 'application/json' } });
  }

let predictionData;
try {
  predictionData = await predictionResponse.json();
  console.log("predictionData == "+predictionData)
} catch (e) {
  console.error("Failed to parse prediction response:", e);
  return new NextResponse(JSON.stringify({ error: 'Failed to parse prediction response' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
}

return new NextResponse(JSON.stringify(predictionData), { status:  201, headers: { 'Content-Type': 'application/json' } });
}