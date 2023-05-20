//api/board
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';
import prisma from "@/lib/prisma";
import { Prisma } from '@prisma/client';

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
  const boardExist = await exist({
    where: {
      id: boardId
    }
  })
  if (boardExist) {
    await prisma.$disconnect();
    return {message: "Board exists"}
  }

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
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then((text: string) => {
    boardJson = JSON.parse(text);
    admins = boardJson.memberships.map((element: any) => element.idMember)
  })
  .catch((err: Error) => console.error(err));

  await prisma.project.create({
    data: {
      id: boardId,
      source: "TRELLO",
      name: boardJson?boardJson["name"]:"",
      adminIds: admins,
    }
  });
  await prisma.$disconnect();
  return {message: "Board created"}
}

export default insertBoard;
