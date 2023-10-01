import prisma from "@/lib/prisma";

export function getDefaultLevels() {
    return ["Low", "Medium", "High"]
}