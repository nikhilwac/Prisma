import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthPaylodDto } from './dtos/auth.paylod.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async login(@Body() authPaylodDto: AuthPaylodDto) {
    const user = await this.authService.validateUser(authPaylodDto);
    if (!user) throw new HttpException('Invalid Credentials', 401);
    return { token: user };
  }
}
