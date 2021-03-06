import type { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import Head from 'next/head'
import Center from '../components/Center/Center'
import Player from '../components/Player/Player'
import Sidebar from '../components/Sidebar/Sidebar'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <meta name="description" content="Spotify clone" />
        <meta
          name="keywords"
          content="Spotify, Spotify clone, Spotify web api, Music"
        />
        <meta name="author" content="Gri-ffin" />
      </Head>
      <div className="h-screen overflow-hidden bg-black">
        <main className="flex">
          <Sidebar />
          <Center />
        </main>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  )
}

export default Home

// fetch the session on server and get token and user before hitting the client
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
