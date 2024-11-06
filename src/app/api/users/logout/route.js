import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function DELETE() {
    try {
        const cookie = serialize('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1,
            path: '/',
            sameSite: 'Strict',
        });

        const response = new NextResponse(JSON.stringify({ message: 'Logout successful', success: true }));
        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch (err) {
        console.log('Error in logout:', err);
        return new NextResponse(JSON.stringify({ message: 'Logout failed', error: 1 }), { status: 500 });
    }
}