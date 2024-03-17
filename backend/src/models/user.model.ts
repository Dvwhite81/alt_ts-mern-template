import mongoose, { Schema, Document } from 'mongoose';

export interface EventType {
  description: string;
  allDay: boolean;
  start: Date;
  end: Date;
}

export interface ToDoType {
  title: string;
  color: string;
  urgency: string;
}

export interface IUser extends Document {
  username: string;
  password: string;
  events: EventType[];
  toDos: ToDoType[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  events: [],
  toDos: [],
});

export default mongoose.model<IUser>('User', UserSchema);
