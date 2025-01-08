import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { categoryId, carId } = req.query;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/subcategory?categoryid=${categoryId}&carid=${carId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch subcategories: ${response.statusText}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: "Error fetching subcategories", details: error.message });
  }
}
