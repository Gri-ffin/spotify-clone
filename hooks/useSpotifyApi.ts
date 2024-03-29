import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import spotifyApi from '../lib/spotify'

const useSpotifyApi = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      // if the refresh access token fail, redirect user to login
      if (session.user.refreshToken === 'RefreshedTokenError') {
        signIn()
      }
      spotifyApi.setAccessToken(session?.user?.accessToken!)
    }
  }, [session])

  return spotifyApi
}

export default useSpotifyApi
