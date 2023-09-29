import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import prisma from "@/lib/prisma";
import { getDefaultMetrics, getActiveMetricsByProjectId } from './metric';
import { getDefaultLevels } from './level';
import { ObjectId } from 'mongodb';

dotenv.config();
const apiKey = process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;
const DEFAULT_EMOJIS = [":smile:", ":sad:", ":confused:"];  // Change # of default emojis
const DEFAULT_REFERENCE_NUMBER = 11;

type Data = {
  message: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { boardId } = req.body
    try {
      await insertBoard(boardId);
      res.status(201).json({ message: "Board inserted!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message })
    }
  }
}

async function exist(boardId: string) {
  const count = await prisma.project.count({ where: { id: boardId } });
  return Boolean(count);
}

async function insertBoard(boardId: string) {
  var boardJson = await retrieveBoardFromTrello(boardId);
  var admins = boardJson.memberships.map((element: any) => element.idMember);

  const defaultMetrics = getDefaultMetrics();
  var defaultMetricsObject = defaultMetrics.map(metricName => {
    return {
      name: metricName
    };
  });

  var boardExists = await exist(boardId); // Use trelloBoardId in exist function
  await prisma.project.upsert({
    create: {
      id: boardId,
      source: "TRELLO",
      name: boardJson ? boardJson["name"] : "",
      adminIds: admins,
      emojis: DEFAULT_EMOJIS,
      referenceNumber: DEFAULT_REFERENCE_NUMBER,
      metrics: {
        createMany: {
          data: defaultMetricsObject
        }
      }
    },
    update: {
      name: boardJson ? boardJson["name"] : "",
      adminIds: admins
    },
    where: {
      id: boardId
    }
  });

  if (!boardExists) {
    //insert default levels if board is new
    await addDefaultLevelsToProject(boardId)
  }
  return { message: "Board created" }
}

async function addDefaultLevelsToProject(boardId: string) {
  const defaultLevels = getDefaultLevels()
  var metrics = await getActiveMetricsByProjectId(boardId)
  var levelObjects: any[] = []
  metrics.forEach(metric => {
    defaultLevels.forEach((level, index) => {
      levelObjects.push({
        levelLabel: level,
        levelOrder: index + 1,
        metricId: metric.id,
        projectId: boardId
      })
    })
  })
  await prisma.level.createMany({
    data: levelObjects
  })
  return { message: "Board created" }
}

async function retrieveBoardFromTrello(boardId: string) {
  return await fetch(`https://api.trello.com/1/boards/${boardId}?memberships=admin&key=${apiKey}&token=${apiToken}`, {
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
      return JSON.parse(text);
    })
}

export async function getBoard(boardId: string) {
  return await prisma.project.findFirst({
    where: {
      id: boardId
    }
  });
}

export default handler;
