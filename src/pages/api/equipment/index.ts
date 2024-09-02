import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all equipment
    const equipment = await prisma.equipment.findMany();
    res.status(200).json(equipment);
  } else if (req.method === 'POST') {
    // Create new equipment
    const { name, description, availabilityStatus } = req.body;
    try {
      const newEquipment = await prisma.equipment.create({
        data: {
          name,
          description,
          availabilityStatus,
        },
      });
      res.status(201).json(newEquipment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create equipment' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
