import { Schema, Prop, SchemaFactory } from '@nestJs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export enum Status {
  COMPLETED = 'Completed',
  UNCOMPLETED = 'Uncompleted',
}

@Schema()
export class Task extends Document {
  @Prop()
  title: string;

  @Prop({ default: Status.UNCOMPLETED })
  status: Status;

  @Prop({ required: false })
  timeSpent: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
