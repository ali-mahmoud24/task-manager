"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestJs/mongoose");
const task_schema_1 = require("./schemas/task.schema");
const mongoose_2 = require("mongoose");
let TasksService = exports.TasksService = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async getTasks(user) {
        try {
            const loadedTasks = await this.taskModel
                .find({ user: user.id })
                .sort({ _id: -1 });
            return loadedTasks;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getTask(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        if (!isValidId) {
            throw new common_1.BadRequestException('Please enter correct id.');
        }
        const loadedTask = await this.taskModel.findById(id);
        if (!loadedTask) {
            throw new common_1.NotFoundException('No such task.');
        }
        return loadedTask;
    }
    async createTask(createTaskDto, user) {
        const newTask = {
            title: createTaskDto.title,
            user: user._id,
        };
        try {
            const result = await this.taskModel.create(newTask);
            return result;
        }
        catch (err) {
            console.log(err);
        }
    }
    async updateTask(id, updateTaskDto) {
        return await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
            runValidators: true,
        });
    }
    async deleteTask(id) {
        return await this.taskModel.findByIdAndDelete(id);
    }
};
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map