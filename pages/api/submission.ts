import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";

type Data = {
  message: string
}

export type RatingWithoutSubmission = {
  emoScore: number,
  level: number,
  levelId: string,
  metricId: string
}

export type Submission = {
  reflection: string
  timestamp: Date
  userId: string
  trelloCardId: string
  ratings: RatingWithoutSubmission[]
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { submission } = req.body
    try {
      await insertSubmission(submission);
      res.status(201).json({ message: "Submission inserted!" });
    } catch (error: any) {
      res.status(500).json({ message: "Server error" })
    }
  }
}

async function insertSubmission(submission: Submission) {
  await prisma.submission.create({
    data: {
      reflection: submission.reflection,
      timestamp: submission.timestamp,
      userId: submission.userId,
      trelloCardId: submission.trelloCardId,
      ratings: {
        create: submission.ratings
      }
    }
  });
  return { message: "Submission created" }
}

export async function getLatestSubmission(userId: string, cardId: string) {
  return await prisma.submission.findMany({
		where: {
			userId: userId,
			trelloCardId: cardId
		}
		, include: {
			ratings: {
				include: {
					metric: true
				}
			}
		}
		, orderBy: {
			timestamp: 'desc'
		}
		, take: 1
	})
}

export default handler;