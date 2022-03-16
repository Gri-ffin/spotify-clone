import { JWT } from 'next-auth/jwt'
import spotifyApi from './spotify'

export async function refreshAccessToken(token: JWT) {
  try {
    spotifyApi.setAccessToken(token.accessToken!)
    spotifyApi.setRefreshToken(token.refreshToken!)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // means one hour hour from now in ms
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch {
    return {
      ...token,
      error: 'RefreshedTokenError',
    }
  }
}

// function that convert milliseconds to minures and seconds
export function MsToMinAndSec(ms: number) {
  const seconds = ((ms % 60000) / 1000).toFixed(0)
  const minutes = Math.floor(ms / 60000)

  return +seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (+seconds < 10 ? '0' : '') + seconds
}
