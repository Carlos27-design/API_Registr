import {
  IsArray,
  IsEmail,
  IsMongoId,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(8)
  password: string;

  @IsMongoId()
  roles: string;
}
