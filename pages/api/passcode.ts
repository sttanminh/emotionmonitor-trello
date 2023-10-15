import dotenv from 'dotenv';
import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from 'next';

dotenv.config();
const apiKey = process.env.API_KEY!;
const apiToken = process.env.API_TOKEN!;

async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        try {
          const passcodeSetResponse = await setPasscode(req.body.passcode, req.body.boardId);
          res
            .status(200)
            .json({ passcodeSet: passcodeSetResponse});
        } catch (error: any) {
            if (error instanceof TypeError) {
                res.status(400).json({ message: "Bad request, please check request body" })
              } else {
                res.status(500).json({ message: "Server error" })
              }
        }
      }
}

export async function checkIsPasscodeSet(boardId: string) {
    const board = await prisma.project.findUnique({
        where: {
                id: boardId,
            }
        })
    if (board?.passcode == "") {
        return false;
    } else {
        return true;
    }
}

async function setPasscode(passcode: string, boardId: string) {
    const result = await prisma.project.update({
        where: {
            id: boardId
        },
        data: {
            passcode: passcode
        }
    })
    await prisma.$disconnect();
    return result;
}
    
export default handler;