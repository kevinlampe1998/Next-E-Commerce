import mongoose from 'mongoose';
import User from './User';
import Image from './Image';

const ProductSchema = new mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_name: { type: String, required: true, unique: true },
    primary_image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    secondary_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
    description: { type: String, required: true },
    category: {
        type: String,
        enum: [ 'electronics', 'clothing', 'gifts', 'beauty', 'living', 'cars', 'office',
            'jewelry', 'food', 'health', 'sports', 'books', 'pet', 'other' ],
        required: true },
    price: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
