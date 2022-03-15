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
        <meta property="description" content="Spotify clone Login page" />
      </Head>
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black">
        <Image width={400} height={400} alt="Spotify Icon" src={spotifyImage} />
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="ml-8 rounded-full bg-[#18D860] p-5 text-white hover:bg-green-600"
              onClick={() => signIn(provider.id, { callbackUrl: '/' })}
            >
              Login with {provider.name}
            </button>
            <p className="m-3 text-center text-3xl font-bold text-white">Or</p>
            <a
              className="ml-3 rounded-full bg-gray-400 p-3 text-white hover:cursor-pointer hover:bg-gray-500"
              href="https://github.com/gri-ffin/spotify-clone"
            >
              Check out the source code
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
