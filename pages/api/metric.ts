import prisma from "@/lib/prisma";

export async function getDefaultMetrics() {
    return await prisma.metric.findMany({
        where: {
            default: true
        }
    })
}

export async function getMetricsByProjectId(projectId: string) {
    return await prisma.metric.findMany({
        where: {
            projectIds: {
                has: projectId
            }
        }
    });
}