import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
export declare enum Status {
    COMPLETED = "Completed",
    UNCOMPLETED = "Uncompleted"
}
type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};
export declare class Task extends Document {
    title: string;
    status: Status;
    timeSpent: Time;
    user: User;
}
export declare const TaskSchema: mongoose.Schema<Task, mongoose.Model<Task, any, any, any, mongoose.Document<unknown, any, Task> & Omit<Task & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Task, mongoose.Document<unknown, {}, mongoose.FlatRecord<Task>> & Omit<mongoose.FlatRecord<Task> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export {};
