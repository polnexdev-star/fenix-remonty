import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mq7nx1p6",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, phone, message } = req.body;

    const result = await client.create({
      _type: "lead",
      name,
      phone,
      message,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}