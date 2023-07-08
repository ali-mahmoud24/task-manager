import { User } from 'src/auth/schema/user.schema';
type Time = {
    hours: number;
    minutes: number;
    seconds: number;
};
export declare class CreateTaskDto {
    readonly title: string;
    readonly status: 'Completed' | 'Uncompleted';
    readonly timeSpent: Time;
    readonly user: User;
}
export {};
