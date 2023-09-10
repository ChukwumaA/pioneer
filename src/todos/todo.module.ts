import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoCategory } from './entities/todo-category.entity';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, TodoCategory])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
