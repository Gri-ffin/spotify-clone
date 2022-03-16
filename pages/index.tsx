import type { NextPage } from 'next'
import Head from 'next/head'
import Center from '../components/Center/Index'
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

          <div>{/* Player */}</div>
        </main>
      </div>
    </>
  )
}

export default Home
