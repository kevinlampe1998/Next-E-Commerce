import bcrypt from 'bcrypt';
import connectMongo from "@/lib/connectMongo";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        connectMongo();

        const body = await req.json();

        const { role, firstName, lastName, birthDay, street, postalCode, city, email, password } = body;

        if (role === '') {
            return new NextResponse(JSON.stringify({ message: 'You have to decide if you want to buy or sell!', error: 1 }));
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ role, firstName, lastName, birthDay, street, postalCode, city, email, hash });

        const savedUser = await user.save();

        user.hash = undefined;

        return new NextResponse(JSON.stringify({ message: 'You are successful registered!', success: 1, user }));

    } catch(err) {
        console.log('Error POST /api/users', err.errors);
        return new NextResponse(JSON.stringify({ message: 'Something went wrong!', error: 1 }));
    }
}
