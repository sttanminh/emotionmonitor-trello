import prisma from "@/lib/prisma";

export function getDefaultLevels() {
    return ["Low", "Medium", "High"]
}

export function getLevelsByProjectId(projectId: string) {
    return prisma.level.findMany({
        where: {
            projectId: projectId
        }
    })
}