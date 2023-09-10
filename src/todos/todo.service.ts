import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { CreateTodoCategoryDto } from './dtos/createTodoCategory.dto';
import { Todo } from './entities/todo.entity';
import { TodoCategory } from './entities/todo-category.entity';
import { ResponseData } from 'src/common/interfaces/response-data.interface';
import { PaginationQueryDto } from 'src/common/dtos/pagination-query.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    @InjectRepository(TodoCategory)
    private readonly todoCategoryRepository: Repository<TodoCategory>,
  ) {}

  async create(
    createTodoDto: CreateTodoDto,
    todoCategoryDto: CreateTodoCategoryDto,
  ): Promise<ResponseData> {
    const new_todo = this.todoRepository.create({
      ...createTodoDto,
      category: todoCategoryDto,
    });
    const saved_todo = await this.todoRepository.save(new_todo);
    if (!saved_todo) {
      throw new BadRequestException('Oops, something went wrong. Try again!');
    }
    return {
      status: 201,
      info: 'Success',
      data: [saved_todo],
    };
  }

  async find(paginationQuery: PaginationQueryDto): Promise<ResponseData> {
    const { limit = 10, offset = 0 } = paginationQuery;
    const todos = await this.todoRepository.find({
      skip: offset,
      take: limit,
      relations: ['category'],
    });
    if (!todos) {
      throw new NotFoundException('Unable to find any todos!');
    }
    return {
      status: 200,
      info: 'Success',
      data: [todos],
    };
  }

  async findOne(id: number): Promise<ResponseData> {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });
    if (!todo) {
      throw new NotFoundException(`Unable to find todo with the id: ${id}!`);
    }
    return {
      status: 200,
      info: 'Success',
      data: [todo],
    };
  }

  async findByCategory(category_name: string) {
    const category = await this.todoCategoryRepository.findOne({
      where: { name: category_name },
      relations: ['todos'],
    });
    if (!category) {
      throw new NotFoundException(
        `The category with the name: ${category_name}, was not found!`,
      );
    }
    return {
      status: 200,
      info: 'Success',
      data: [category.todos],
    };
  }

  async update(
    id: number,
    updateTodoDto: UpdateTodoDto,
  ): Promise<ResponseData> {
    const { data } = await this.findOne(id);
    const todo = await this.todoRepository.preload({
      id: data[0].id,
      title: data[0].title,
      ...updateTodoDto,
    });
    if (!todo) {
      throw new NotFoundException(
        `The todo with the title"${data[0].title}", was not found!`,
      );
    }
    const updated_todo = await this.todoRepository.save(todo);

    return {
      status: 200,
      info: 'Success',
      data: [updated_todo],
    };
  }

  async remove(id: number) {
    const { data } = await this.findOne(id);
    return this.todoRepository.remove(data[0]);
  }
}
