import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'The title of the todo' })
  title: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'The author of the todo' })
  author: string;

  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'The content of the todo' })
  content: string;
}
