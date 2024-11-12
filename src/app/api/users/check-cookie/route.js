import { parse } from "cookie";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import User from "@/models/User";

export async function GET(req, res) {
    try {
        const token = await req?.cookies?._parsed?.get('token')?.value;

        if (!token) {
            return new NextResponse(JSON.stringify({ message: 'Token not found!', error: 1 }));
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({ _id: verify.id });

        if (!verify || !user)
            return new NextResponse(JSON.stringify({ message: 'Token is invalid!', error: 1 }));

        return new NextResponse(JSON.stringify({ message: 'Your token is valid!', success: 1, user }));

    } catch (err) {
        console.log('Error GET /api/users/check-cookie', err);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!', error: 1 }));
    }
}