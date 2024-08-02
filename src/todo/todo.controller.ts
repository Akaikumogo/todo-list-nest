import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Todo')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    return this.todoService.create(createTodoDto, req);
  }

  @Get()
  findAll(@Req() req) {
    return this.todoService.findAll(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.todoService.findOne(id, req);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req,
  ) {
    return this.todoService.update(id, updateTodoDto, req);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.todoService.remove(id, req);
  }
}
