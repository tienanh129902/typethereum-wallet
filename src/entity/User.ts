import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
  },
  // accountID: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  phoneNumber: {
    type: String,
    match: [/^[0-9]+$/, 'is invalid'],
    required: true
  }
})
const User = mongoose.model('Users',userSchema);

export {User};
