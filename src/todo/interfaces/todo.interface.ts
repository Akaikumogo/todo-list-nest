import { Document } from 'mongoose';
export interface ITodo extends Document {
  user: string;
  todoName: string;
  Description: string;
  addedDate: Date;
  LastChangeDate: Date | null;
  Status: 'OnPending' | 'OnProcess' | 'OnSuccess';
  isDeleted: boolean;
}
