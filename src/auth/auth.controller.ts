import { Body, Controller, Post } from '@nestjs/common';
import { AuthPaylodDto } from './dtos/auth.paylod.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  login(@Body() authPaylodDto: AuthPaylodDto) {
    return this.authService.validateUser(authPaylodDto);
  }
}
