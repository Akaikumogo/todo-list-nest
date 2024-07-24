import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});
