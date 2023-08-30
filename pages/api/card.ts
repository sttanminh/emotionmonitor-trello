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
    const { cardId } = req.body
    try {
      await insertCard(cardId);
      res.status(201).json({message: "Card inserted!"});
    } catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }
}

async function exist(args: Prisma.TrelloCardCountArgs) {
  const count = await prisma.trelloCard.count(args)
  return Boolean(count)
}

async function insertCard(cardId: string){
  const cardExists = await exist({
    where: {
      id: cardId
    }
  })
  if (cardExists) {
    await prisma.$disconnect();
    return {message: "Card exists"}
  }

	var cardJson: any;
	await fetch(`https://api.trello.com/1/cards/${cardId}?list=true&fields=name,list,labels,idBoard&fields=name,desc&key=${apiKey}&token=${apiToken}`, {
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
		cardJson = JSON.parse(text);
	})
  .catch((err: Error) => console.error(err));

	await prisma.trelloCard.upsert({
		create: {
			id: cardId,
			taskName: cardJson?cardJson.name:"",
			projectId: cardJson?cardJson.idBoard:"",
      description: cardJson?cardJson.desc:""
		},
		update: {},
		where: { id: cardId},
	});
	
	await prisma.$disconnect();
  return {message: "Card created"}
}

export default insertCard;
