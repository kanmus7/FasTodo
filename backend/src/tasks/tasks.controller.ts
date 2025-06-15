import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from 'src/auth/jwt.strategy';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const userId = (req as any).user.userId;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  find(@Param('id') taskId: string) {
    return this.tasksService.find(taskId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') taskId: string) {
    return this.tasksService.remove(taskId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(taskId, updateTaskDto);
  }
}
