import { NextResponse } from "next/server";
import Product from "@/models/Product";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);
        
        const newProduct = new Product(body);
        const savedProduct = await newProduct.save();

        const product = await Product.findOne(savedProduct)
            .populate('primary_image');

        return NextResponse.json({
            message: 'Product successful saved!',
            success: true, product
        });

    } catch(err) {
        console.log('Error POST /api/set-product', err);
        return NextResponse.json({ error: 'Upload failed' });
    } 
}