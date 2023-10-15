import dotenv from 'dotenv';
import prisma from "@/lib/prisma";
import { getDefaultMetrics, getActiveMetricsByProjectId } from './metric';
import { getDefaultLevels } from './level';

dotenv.config();
const apiKey = process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;
const DEFAULT_EMOJIS = ["😢", "😔", "😐", "😀", "😊"];
const DEFAULT_REFERENCE_NUMBER = 3;

async function exist(boardId: string) {
  const count = await prisma.project.count({
    where: {
      id: boardId
    }
  })
  return Boolean(count)
}

async function insertBoard(boardId: string) {
  var boardJson = await retrieveBoardFromTrello(boardId);
  var admins = boardJson.memberships.map((element: any) => element.idMember)

  const defaultMetrics = getDefaultMetrics()
  var defaultMetricsObject = defaultMetrics.map(metricName => {
    return {
      name: metricName
    }
  })
  var boardExists = await exist(boardId)
  await prisma.project.upsert({
    //TODO: include default emojis and reference number in create -> a new project should have default emojis and reference number
    create: {
      id: boardId,
      source: "TRELLO",
      name: boardJson ? boardJson["name"] : "",
      emojis: DEFAULT_EMOJIS,
      referenceNumber: DEFAULT_REFERENCE_NUMBER,
      adminIds: admins,
      metrics: { //insert default metrics if board is new
        createMany: {
          data: defaultMetricsObject
        }
      },
      passcode: "",
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
          active: true,
          metricId: metric.id
        })
      })
    })
    await prisma.$transaction([
      prisma.level.deleteMany({
        where: {
          metricId: {
            in: metrics.map(metric => metric.id)
          }
        }
      }),
      prisma.level.createMany({
        data: levelObjects
      })
    ]);
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

export default insertBoard;