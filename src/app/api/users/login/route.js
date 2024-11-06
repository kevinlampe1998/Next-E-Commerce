import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectMongo from "@/lib/connectMongo";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        connectMongo();

        const body = await req.json();

        const { email, password } = body;

        const user = await User.findOne({ email });

        if (!user) {
            return new NextResponse(JSON.stringify({ message: 'Email not found!', error: 1 }));
        }

        const passwordCorrect = await bcrypt.compare( password, user.hash );

        if (!passwordCorrect) {
            return new NextResponse(JSON.stringify({ message: 'Password is wrong!', error: 1 }));
        }

        user.hash = undefined;

        const token = jwt.sign(
            { id: user._id }, 
            process.env.JWT_SECRET_KEY, 
            { expiresIn: '1h' }
        );

        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
            sameSite: 'Strict',
        });

        const response = new NextResponse(JSON.stringify({ message: 'You are successfully logged in!', success: 1, user }));
        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch(err) {
        console.log('Error POST /api/users/login', err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!', error: 1 }));
    }
}