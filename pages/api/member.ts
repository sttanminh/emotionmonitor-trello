import dotenv from 'dotenv';
import prisma from "@/lib/prisma";

dotenv.config();
const apiKey =  process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;

async function insertUser(memberId: string){
	var memberJson: any;
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

	await prisma.user.upsert({
		create: {
			id: memberId,
			name: memberJson? memberJson.fullName:""
		},
    update: {
      name: memberJson? memberJson.fullName:""
    },
    where: {
      id: memberId
    }
	});
  return {message: "User created"}
}

export default insertUser;
