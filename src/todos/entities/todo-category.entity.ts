import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from './todo.entity';

@Entity()
export class TodoCategory {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ nullable: false, unique: true })
  public name: string;

  @OneToMany(() => Todo, (todo: Todo) => todo.category)
  public todos: Todo[];
}
