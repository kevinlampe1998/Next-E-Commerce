import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
  const token = await req?.cookies?._parsed?.get('token')?.value;

  if (!token) {
    // return new NextResponse(JSON.stringify({ message: 'Token not found!', error: 1 }), { status: 401 });
    return NextResponse.redirect(new URL('/', req.url));
  }

  console.log(token);

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
    console.log(payload);
    console.log(payload.role);

    const { pathname } = req.nextUrl;

    console.log(pathname);

    if (pathname.startsWith('/pages/set-product')) {
      if (payload.role !== 'sell') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: 'Invalid token', error: 1 }), { status: 401 });
  }
}

export const config = {
  matcher: ['/pages/set-product/:path*'],
};
