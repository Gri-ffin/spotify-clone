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
