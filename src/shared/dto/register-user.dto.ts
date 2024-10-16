import { IsEmail, IsMongoId, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(8)
  password: string;

  @IsMongoId()
  roles: string;
}
