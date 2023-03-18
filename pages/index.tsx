import React from "react"
import { InferGetServerSidePropsType } from "next"
import { getGlobalCommands } from "services/discord"

export const getServerSideProps = async () => {
  try {
    const { data } = await getGlobalCommands()
    return { props: { data } }
  } catch (err) {
    console.error(err)
    return { props: { data: null } }
  }
}

const IndexPage = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(data);
  
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default IndexPage
