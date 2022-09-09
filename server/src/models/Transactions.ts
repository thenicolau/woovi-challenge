import mongoose, { Schema } from "mongoose";

const IUser = {
    type: Schema.Types.ObjectId,
    ref: 'users'
}

const IPixKey = {
    type: Schema.Types.ObjectId,
    ref: 'pix_keys'
}
const TransactionsSchema = new Schema({
    value: Number,
    receiver: IUser,
    sender: IUser,
    status: {
        type: String,
        enum: ['CANCELED', 'PAID', 'PENDING', 'DENIED']
    },
    scheduled_payment_date: Date,
    payment_date: Date,
    key_receiver: IPixKey,
})

export default mongoose.model('transactions', TransactionsSchema)