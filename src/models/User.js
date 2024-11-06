import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: [ 'sell', 'buy' ], required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDay: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);