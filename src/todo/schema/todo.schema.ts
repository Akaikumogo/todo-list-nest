import { Schema } from 'mongoose';

export const TodoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  todoName: { type: String, required: true },
  Description: { type: String, required: true },
  addedDate: { type: String, required: true },
  LastChangeDate: { type: String, required: true },
  Status: {
    type: String,
    enum: ['OnPending', 'OnProcces', 'OnSuccess'],
    default: 'OnPending',
  },
  isDeleted: { type: Boolean, require: true },
});
