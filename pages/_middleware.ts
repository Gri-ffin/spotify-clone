import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { NextApiRequest } from 'next'

export async function middleware(req: NextRequest & NextApiRequest) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET! })

  const { pathname } = req.nextUrl
  // Allow request if token exist or request for next-auth session & provider
  if (pathname.includes('/api/auth') || token) {
    // we allow the request to pass
    return NextResponse.next()
  }

  // else redirect to login if requesting protected route
  if (!token && pathname !== '/login') {
    // get the absolute path of the request
    const url = req.nextUrl.clone()
    // add the /login to the url
    url.pathname = '/login'
    // redirect to the path we construct
    return NextResponse.redirect(url)
  }
}
