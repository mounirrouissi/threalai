import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Extract the image ID from the request parameters
    const { id } = req.query;
   
    // Handle the request based on the HTTP method
    switch (req.method) {
       case 'GET':
         // Respond with a JSON object containing the image ID
         res.status(200).json({ imageId: id });
         break;
       default:
         // Send a  405 Method Not Allowed response for unsupported methods
         res.status(405).end();
         break;
    }
}