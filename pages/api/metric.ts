import prisma from "@/lib/prisma";

export function getDefaultMetrics() {
    return ['Complexity', 'Difficulty', 'Workload']
}

export async function getActiveMetricsByProjectId(projectId: string) {
    return await prisma.metric.findMany({
        include: {
            levels: true
        },
        where: {
            projectId: projectId,
            active: true
        }
    });
}