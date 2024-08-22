import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { bcryptSalt } from './utils/static.constatnts';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  getAdmin() {
    return this.prisma.admin.findMany();
  }

  async getAdminById(id: number) {
    const isFound = await this.prisma.admin.findUnique({ where: { id } });
    if (!isFound) throw new NotFoundException('Admin Notfound');
    const { password, ...userDetails } = isFound;
    return userDetails;
  }

  async createAdmin(data: Prisma.AdminCreateInput) {
    if (data.email) {
      const is_found = await this.prisma.admin.findUnique({
        where: { email: data.email as string },
      });
      if (is_found) throw new BadRequestException('Email already Taken');
    }
    data.password = await bcrypt.hash(data.password, bcryptSalt);
    return this.prisma.admin.create({ data });
  }

  async updateAdmin(id: number, data: Prisma.AdminUpdateInput) {
    const is_found = await this.getAdminById(id);
    if (!is_found) throw new NotFoundException('Admin Not Found');

    if (data.email) {
      const is_found = await this.prisma.admin.findUnique({
        where: { email: data.email as string },
      });

      if (is_found) throw new NotFoundException('Email already Taken');
    }

    return this.prisma.admin.update({ where: { id }, data });
  }

  async deleteUserById(id: number) {
    const is_found = await this.getAdminById(id);
    if (!is_found) throw new NotFoundException('Admin Not Found');

    return this.prisma.admin.delete({ where: { id } });
  }
}
