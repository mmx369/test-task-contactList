import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  phone: String,
  address: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Contact = mongoose.model('Contact', contactSchema)

export default Contact
