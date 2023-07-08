import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
export declare class TasksService {
    private taskModel;
    constructor(taskModel: mongoose.Model<Task>);
    getTasks(user: User): Promise<Task[]>;
    getTask(id: string): Promise<Task>;
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<Task>;
}
