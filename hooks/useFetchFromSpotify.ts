import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

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
