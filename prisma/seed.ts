import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const complexity = await prisma.metric.upsert({
    where: { name: 'Complexity' },
    update: {},
    create: {
      name: 'Complexity'
    },
  })
  const difficulty = await prisma.metric.upsert({
    where: { name: 'Difficulty' },
    update: {},
    create: {
      name: 'Difficulty'
    },
  })
	const workload = await prisma.metric.upsert({
    where: { name: 'Workload' },
    update: {},
    create: {
      name: 'Workload'
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })