import { Injectable } from '@nestjs/common';
import { AuthPaylodDto } from './dtos/auth.paylod.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: AuthPaylodDto) {
    const findUser = await this.prisma.admin.findUnique({ where: { email } });
    if (!findUser) return null;
    if (findUser.password === password) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
