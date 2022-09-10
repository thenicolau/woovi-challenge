import mongoose, { Schema } from 'mongoose'

const IUser = {
  type: Schema.Types.ObjectId,
  ref: 'users',
}

const PixKeySchema = new Schema({
  user: IUser,
  type_key: {
    type: String,
    enum: ['DOCUMENT', 'EMAIL', 'PHONE_NUMBER', 'RANDOM'],
  },
  key: String,
})

export default mongoose.model('pix_keys', PixKeySchema)
