import { model, Schema, Types } from 'mongoose'

interface IUser {
  email: string
  passwordHash: string
  contacts: Types.ObjectId
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email must be provided'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contacts',
    },
  ],
})

const User = model<IUser>('User', userSchema)

export default User
