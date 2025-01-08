
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { categoryId, carId } = req.query;

  
  if (!categoryId) {

    return res.status(400).json({ error: "Category ID is required" });
  }

  try {
    // Fetch subcategories from your API or database
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/subcategories?categoryid=${categoryId}&carid=${carId}`);
    const data = await response.json();
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching subcategories" });
  }
}
