import { Document } from 'mongoose';

export interface User extends Document {
  readonly todoName: string;
  readonly Status: string;
  readonly Description: string;
  readonly addedDate: string;
  readonly LastChangeDate: string;
}