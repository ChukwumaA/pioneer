import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoCategoryDto {
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', description: 'The category of the todo' })
  name: string;
}
