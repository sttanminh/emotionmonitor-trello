import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import prisma from "@/lib/prisma";
import { Metric, Prisma } from '@prisma/client';
import { getDefaultMetrics } from './metric';

dotenv.config();
const apiKey =  process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;

type Data = {
  message: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { boardId } = req.body
    try {
      await insertBoard(boardId);
      res.status(201).json({message: "Board inserted!"});
    } catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }
}

async function exist(args: Prisma.ProjectCountArgs) {
  const count = await prisma.project.count(args)
  return Boolean(count)
}

async function insertBoard(boardId: string){
  var boardJson;
  var admins;
  
  await fetch(`https://api.trello.com/1/boards/${boardId}?memberships=admin&key=${apiKey}&token=${apiToken}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then((response: Response) => {
    console.log(
      `Trello response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then((text: string) => {
    boardJson = JSON.parse(text);
    admins = boardJson.memberships.map((element: any) => element.idMember)
  })
  .catch((err: Error) => console.error(err));

  var defaultMetrics = await getDefaultMetrics();
  var defaultMetricIds = defaultMetrics.map((metric: Metric) => {
    return {"id": metric.id}
  })

  await prisma.project.upsert({
    create: {
      id: boardId,
      source: "TRELLO",
      name: boardJson?boardJson["name"]:"",
      adminIds: admins,
      metrics: {
        connect: defaultMetricIds
      }
    },
    update: {
      source: "TRELLO",
      name: boardJson?boardJson["name"]:"",
      adminIds: admins,
      metrics: {
        connect: defaultMetricIds
      }
    },
    where: { 
      id: boardId 
    }
  });
  await prisma.$disconnect();
  return {message: "Board created"}
}

export async function getBoard(boardId: string) {
  return await prisma.project.findFirst({
    where: {
        id: boardId
    },
    include: {
      metrics: true
    }
});
}

export default insertBoard;
