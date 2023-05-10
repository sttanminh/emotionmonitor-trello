import prisma from '@/lib/prisma'
import { GetStaticProps } from "next"
import { User } from '@prisma/client'

function Home(props: Props) {
  console.log(props)
  return (
    <h1>Hello</h1>
  )
}
type Props = {
  feed: User[]
}

export const getStaticProps: GetStaticProps = async () => {
  const user = await prisma.user.create({
        data: {
          name: 'Monica',
          email: 'monica@prisma.io'
        },
      })
  const feed = await prisma.user.findMany({
    where: { name: "Monica" }
    });
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

export default Home;
