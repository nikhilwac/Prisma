import { Injectable } from '@nestjs/common';
import { AuthPaylodDto } from './dtos/auth.paylod.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async validateUser({ email, password }: AuthPaylodDto) {
    const findUser = await this.prisma.admin.findUnique({ where: { email } });
    if (!findUser) return null;
    const isPasswordMatch = await bcrypt.compare(password, findUser.password);
    if (isPasswordMatch) {
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
}
