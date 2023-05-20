//api/board
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import prisma from "@/lib/prisma";
import { Prisma, Rating } from '@prisma/client';

dotenv.config();
const apiKey =  process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;

type Data = {
  message: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { ratings } = req.body
    try {
      await insertRating(ratings);
      res.status(201).json({message: "Rating inserted!"});
    } catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }
}

async function insertRating(ratings: Rating[]){
	for await (var rating of ratings) {
		await prisma.rating.create({
			data: {
				score: rating.score,
				metricId: rating.metricId,
				userId: rating.userId,
				trelloCardId: rating.trelloCardId,
				timestamp: rating.timestamp
			}
		});
		await prisma.$disconnect();
		return {message: "Rating created"}
	}
}

export default handler;
