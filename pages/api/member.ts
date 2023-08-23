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
    const { memberId } = req.body
    try {
      await insertUser(memberId);
      res.status(201).json({message: "Member inserted!"});
    } catch (error: any) {
      res.status(500).json({message: error.message})
    }
  }
}

async function exist(args: Prisma.UserCountArgs) {
  const count = await prisma.user.count(args)
  return Boolean(count)
}

async function insertUser(memberId: string){
  console.log("Check user exists")
	console.log(new Date())
  const userExist = await exist({
    where: {
      id: memberId
    }
  })
  if (userExist) {
    await prisma.$disconnect();
    return {message: "User exists"}
  }
	var memberJson: any;
  console.log("Trello API call")
	console.log(new Date())
	await fetch(`https://api.trello.com/1/members/${memberId}?fields=id,fullName,email&key=${apiKey}&token=${apiToken}`, {
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
		memberJson = JSON.parse(text);
	})
  .catch((err: Error) => console.error(err));

  console.log("Create user")
	console.log(new Date())
	await prisma.user.create({
		data: {
			id: memberId,
			name: memberJson? memberJson.fullName:"",
			email: memberJson? memberJson.email:"",
		}
	});
	await prisma.$disconnect();
  console.log("Finish user")
	console.log(new Date())
  return {message: "User created"}
}

export default insertUser;
