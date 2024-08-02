import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITodo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private todoModel: Model<ITodo>) {}
  private extractToken(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    return JSON.parse(atob(authHeader.split(' ')[1]))?.sub;
  }
  async create(createTodoDto: CreateTodoDto, req: Request) {
    const token = this.extractToken(req);
    const newTodo = {
      ...createTodoDto,
      Status: 'OnPending',
      addedDate: new Date(),
      LastChangeDate: null,
      user: token,
    };
    const todo = new this.todoModel(newTodo);
    await todo.save();
    return { status: 201, message: 'Todo Created' };
  }

  async findAll(req: Request) {
    const token = this.extractToken(req);
    return await this.todoModel.find({ user: token }).exec();
  }

  async findOne(id: string, req: Request) {
    const token = this.extractToken(req);
    const todo = await this.todoModel.findOne({ _id: id, user: token }).exec();
    if (!todo) {
      return {
        status: 404,
        message: 'Todo not found or you do not have access',
      };
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, req: Request) {
    const token = this.extractToken(req);
    const updatedTodo = await this.todoModel
      .findOneAndUpdate({ _id: id, user: token }, updateTodoDto, { new: true })
      .exec();
    if (!updatedTodo) {
      return {
        status: 404,
        message: 'Todo not found or you do not have access',
      };
    }
    return { status: 200, message: 'Todo updated', updatedTodo };
  }

  async remove(id: string, req: Request) {
    const token = this.extractToken(req);
    const deletedTodo = await this.todoModel
      .findOneAndDelete({ _id: id, user: token })
      .exec();
    if (!deletedTodo) {
      return {
        status: 404,
        message: 'Todo not found or you do not have access',
      };
    }
    return { status: 200, message: 'Todo deleted' };
  }
}
