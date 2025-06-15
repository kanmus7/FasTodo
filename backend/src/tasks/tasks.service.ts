import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tasks } from './tasks.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Tasks.name) private readonly tasksModel: Model<Tasks>,
  ) {}

  create(createTaskDto: CreateTaskDto, userId: string) {
    const newTask = new this.tasksModel({
      id: Date.now().toString(),
      ...createTaskDto,
      userId,
      completed: createTaskDto.completed ?? false,
    });

    return newTask.save();
  }

  async findAll(userId: string) {
    return await this.tasksModel.find({ userId }).exec();
  }

  async remove(id: string) {
    return await this.tasksModel.findByIdAndDelete(id).exec();
  }

  async find(id: string) {
    return await this.tasksModel.findById(id).exec();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.tasksModel
      .findByIdAndUpdate(id, updateTaskDto, {
        new: true,
      })
      .exec();
  }
}
