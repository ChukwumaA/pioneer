import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiParam,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dtos/createTodo.dto';
import { CreateTodoCategoryDto } from './dtos/createTodoCategory.dto';
import { UpdateTodoDto } from './dtos/updateTodo.dto';
import { PaginationQueryDto } from '../common/dtos/pagination-query.dto';

@ApiTags('todos')
@Controller('api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The todo has been created succesfully',
    type: Todo,
  })
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Body() createTodoCategoryDto: CreateTodoCategoryDto,
  ) {
    return this.todosService.create(createTodoDto, createTodoCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of notes',
    type: Array<Todo>,
  })
  @ApiQuery({ name: 'Pagination Query', type: PaginationQueryDto })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.todosService.find(paginationQuery);
  }

  @Get('search')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of todos by category',
    type: Array<Todo>,
  })
  findByCategory(@Query('category') category: string) {
    return this.todosService.findByCategory(category);
  }

  @Get('id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A todo was found',
    type: Todo,
  })
  @ApiParam({ name: 'id', type: 'number' })
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch('id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'A todo was successfully updated',
    type: Todo,
  })
  @ApiBody({
    description: 'A todo data type',
    type: UpdateTodoDto,
  })
  @ApiParam({ name: 'id', type: 'number' })
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete('id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'A todo was successfully deleted',
  })
  @ApiParam({ name: 'id', type: 'number' })
  remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
