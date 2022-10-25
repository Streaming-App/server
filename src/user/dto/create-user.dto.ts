import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { regexHelper } from 'src/helpers/regex.helper';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  @Matches(regexHelper.password, { message: 'Invalid email or password' })
  password: string;
}
