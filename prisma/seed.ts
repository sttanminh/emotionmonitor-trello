import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const complexity = await prisma.metric.upsert({
    where: { name: 'Complexity' },
    update: {},
    create: {
      name: 'Complexity',
      default: true
    },
  })
  const difficulty = await prisma.metric.upsert({
    where: { name: 'Difficulty' },
    update: {},
    create: {
      name: 'Difficulty',
      default: true
    },
  })
	const workload = await prisma.metric.upsert({
    where: { name: 'Workload' },
    update: {},
    create: {
      name: 'Workload',
      default: true
    },
  })

//   const submissionOne = await prisma.submission.create({
//     data: {reflection: "this card is written terribly", timestamp: new Date(), trelloCardId: '64424477e1b9b792905c2a68', userId: '5f29ee8a6706421502f785d6'},
//   })
  
//   const submissionTwo = await prisma.submission.create({
//     data: {reflection: "this card is written less terribly", timestamp: new Date(), trelloCardId: '64424477e1b9b792905c2a68', userId: '5f29ee8a6706421502f785d6'},
//   })

//   const rating1 = await prisma.rating.create({ 
//     data: {emoScore: 1, level: 1, metricId: complexity.id, submissionId: submissionOne.id}
//   })
//   const rating2 = await prisma.rating.create({ 
//     data: {emoScore: 3, level: 2, metricId: complexity.id, submissionId: submissionTwo.id}
//   })
//   const rating3 = await prisma.rating.create({ 
//     data: {emoScore: 1, level: 1, metricId: difficulty.id, submissionId: submissionOne.id}
//   })
//   const rating4 = await prisma.rating.create({ 
//     data: {emoScore: 3, level: 3, metricId: difficulty.id, submissionId: submissionTwo.id}
//   })
//   const rating5 = await prisma.rating.create({ 
//     data: {emoScore: 1, level: 1, metricId: workload.id, submissionId: submissionOne.id}
//   })
//   const rating6 = await prisma.rating.create({ 
//     data: {emoScore: 3, level: 1, metricId: workload.id, submissionId: submissionTwo.id}
//   })
  
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

  // const learning = await prisma.metric.upsert({
  //   where: { name: 'Learning' },
  //   update: {},
  //   create: {
  //     name: 'Learning',
  //     default: true,
  //     Projects: {
  //       connect: {
  //         id : '643d2f9487baeec2c1c0c2d1'
  //       }
  //     }
  //   }
  // })