import dotenv from 'dotenv';
import prisma from "@/lib/prisma";

dotenv.config();
const apiKey =  process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;

async function insertCard(cardId: string){
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
		update: {
      taskName: cardJson?cardJson.name:"",
			projectId: cardJson?cardJson.idBoard:"",
      description: cardJson?cardJson.desc:""
    },
		where: { 
      id: cardId
    },
	});
  return {message: "Card created"}
}

export default insertCard;
