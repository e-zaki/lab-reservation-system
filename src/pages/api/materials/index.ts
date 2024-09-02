import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all materials
    const materials = await prisma.material.findMany();
    res.status(200).json(materials);
  } else if (req.method === 'POST') {
    // Create new material
    const { name, description, quantityAvailable } = req.body;
    try {
      const newMaterial = await prisma.material.create({
        data: {
          name,
          description,
          quantityAvailable,
        },
      });
      res.status(201).json(newMaterial);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create material' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
