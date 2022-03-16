import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

const useFetchFromSpotify = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // if the refresh access token fail, redirect user to login
      if (session.error === 'RefreshedTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session?.user?.accessToken!)
    }
  }, [session])

  return spotifyApi
}

export default useFetchFromSpotify
