import prisma from "@/lib/prisma";

export function getDefaultLevels() {
    return ["Low", "Medium", "High"]
}

export async function getLevelsByProjectId(projectId: string) {
    return await prisma.level.findMany({
        where: {
            projectId: projectId
        }
    })
}