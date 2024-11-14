import { NextResponse } from "next/server";
import Product from "@/models/Product";

export const GET = async ({ category }) => {
    try {

        console.log('category', category);

        // const products = await Product.find({  });

        return NextResponse.json({ message: 'Here are your categorized products!', success: 1 });

    } catch(err) {
        console.log('Error GET /api/products/[category]', err);
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });
    }
};