import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsEmpty,
} from 'class-validator';

import { User } from 'src/auth/schema/user.schema';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsEnum(['Completed', 'Uncompleted'], { message: 'Use Correct status' })
  readonly status: 'Completed' | 'Uncompleted';

  @IsEmpty({ message: "You can't pass user id" })
  readonly user: User;
}
