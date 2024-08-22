import { IsString } from 'class-validator';

export class AuthPaylodDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
