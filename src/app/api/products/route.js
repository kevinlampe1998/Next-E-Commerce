import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Image from "@/models/Image";
import User from "@/models/User";

export async function POST(req) {
    try {
        const body = await req.json();
        console.log(body);

        const { product_name, seller, price, category, description, primary_image } = body;

        console.log(product_name, seller, price, category, description, primary_image);

        if ( !product_name || !price || !category || !description || !primary_image ) {
            return NextResponse.json({
                message: 'At least one input is missing!',
                error: true
            });
        }

        if (!seller) {
            return NextResponse.json({
                message: 'Internal error, referencing user to product!',
                error: true
            });
        }

        const nameExists = await Product.findOne({ product_name });

        if (nameExists) {
            return NextResponse.json({
                message: 'Product name exists already!',
                error: true
            });
        }
        
        const newProduct = new Product({
            product_name, seller, price, category, description, primary_image
        });
        const savedProduct = await newProduct.save();

        const product = await Product.findOne(savedProduct)
            .populate('primary_image');

        return NextResponse.json({
            message: 'Product successful saved!',
            success: true,
            product
        });

    } catch(err) {
        console.log('Error POST /api/set-product', err);
        return NextResponse.json({ error: 'Upload failed' });
    } 
}

export async function GET(req, res) {
    try {
        const aggregatedProducts = await Product.aggregate([
            { $sample: { size: 10 } }
        ]);
        console.log('aggregatedProducts', aggregatedProducts);

        if (!aggregatedProducts) {
            return NextResponse.json({
                message: 'Aggregated products not found!',
                error: true
            });
        }

        const products = await Product.populate(aggregatedProducts,
            [{ path: 'primary_image', model: 'Image' }, { path: 'seller', model: 'User' }]);

        if (!products) {
            return NextResponse.json({
                message: 'Error populating products!',
                error: true
            });
        }

        return NextResponse.json({
            message: 'Here are your some random products!',
            success: true, products
        });

    } catch(err) {
        console.log('Error POST /api/set-product', err);
        return NextResponse.json({ error: 'Something went wrong! GET /api/products' });
    }
}