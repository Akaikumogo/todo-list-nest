import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<ITodo>) {}
  create(createTodoDto: CreateTodoDto) {
    const newTodo = { ...createTodoDto };
    const todo = new this.todoModel({
      ...newTodo,
      Status: 'OnPending',
      addedDate: new Date(),
    });
    todo.save();
    return { status: 201, message: 'Todo Created' };
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
