import type { GetServerSideProps, NextPage } from 'next'
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import spotifyImage from '/public/images/spotify-logo.png'

interface Props {
  providers: ClientSafeProvider[]
}

const Login: NextPage<Props> = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Spotify Clone | Login</title>
        <meta name="description" content="Spotify clone Login page" />
        <meta
          name="keywords"
          content="Spotify, Spotify clone, Spotify web api, Music"
        />
        <meta name="author" content="Gri-ffin" />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
        <Image width={400} height={400} alt="Spotify Icon" src={spotifyImage} />
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="flex flex-col items-center space-y-3 md:flex-row md:space-x-3 md:space-y-0"
          >
            <button
              className="ml-2 rounded-full bg-[#18D860] p-3 text-white hover:bg-green-600"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
            <a
              href="https://github.com/Gri-ffin/spotify-clone"
              className="rounded-full bg-gray-300 p-3 text-white hover:bg-gray-500"
            >
              Source code
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: {
      providers,
    },
  }
}
