import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { TodoCategory } from './todo-category.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public author: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: false })
  @Exclude()
  updated_at: Date;

  @ManyToOne(() => TodoCategory, (category: TodoCategory) => category.todos)
  public category: TodoCategory;
}
