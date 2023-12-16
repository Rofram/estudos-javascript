import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  salary: Number,
  isActive: Boolean,
}, {
  timestamps: true,
})

export const UserModel =  mongoose.model("Users", userSchema)