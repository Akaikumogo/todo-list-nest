import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  user: { type: String, required: true },
  todoName: { type: String, required: true },
  Description: { type: String, required: true },
  addedDate: { type: Date, required: true },
  LastChangeDate: { type: Date, default: null },
  Status: {
    type: String,
    enum: ['OnPending', 'OnProcess', 'OnSuccess'],
    default: 'OnPending',
  },
  isDeleted: { type: Boolean, required: true },
});
