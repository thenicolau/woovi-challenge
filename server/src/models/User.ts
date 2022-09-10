import mongoose, { Schema } from 'mongoose'

export type IUser = {
  id: string
  name: string
  email: string
  password: string
  balance?: number
}

export const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: Number,
  },
  { versionKey: '_v' }
)

export default mongoose.model<IUser>('users', UserSchema)
