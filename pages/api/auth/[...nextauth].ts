import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import SpotifyProvider from 'next-auth/providers/spotify'
import { refreshAccessToken } from '../../../lib/functions'
import { LOGIN_URL } from '../../../lib/spotify'

// add our own attributes to the JWT interface
declare module 'next-auth/jwt' {
  interface JWT {
    accessTokenExpires: number
    accessToken: string | undefined
    refreshToken: string | undefined
    username: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string | undefined
      refreshToken: string | undefined
      username: string | undefined
      image: string | undefined
      email: string | undefined
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }): Promise<JWT> {
      // This is the initial sign in <// check NextAuth docs //>
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at! * 1000, // Handle the expiration time in ms not seconds
        }
      }
      // If the expiration token did not expire yet after revisiting site
      if (Date.now() < token.accessTokenExpires) {
        return token
      }
      // Update access token if expires
      return await refreshAccessToken(token)
    },

    async session({ session, token }): Promise<Session> {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    },
  },
})
