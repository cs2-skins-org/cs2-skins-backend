import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password_hash: string;

  @IsString()
  steam_id: string;

  @IsString()
  profile_url: string;
}
