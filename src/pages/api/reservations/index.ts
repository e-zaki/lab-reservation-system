import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Fetch all reservations
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
        equipment: true,
        material: true,
        professor: true,
      },
    });
    res.status(200).json(reservations);
  } else if (req.method === 'POST') {
    // Create new reservation
    const { userId, equipmentId, materialId, startTime, endTime, status, professorId } = req.body;
    try {
      const newReservation = await prisma.reservation.create({
        data: {
          userId,
          equipmentId,
          materialId,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          status,
          professorId,
        },
      });
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create reservation' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
