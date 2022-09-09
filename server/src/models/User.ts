import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    balance: Number
})

export default mongoose.model('users', UserSchema)