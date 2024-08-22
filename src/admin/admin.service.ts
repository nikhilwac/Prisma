import { HttpException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  getAdmin() {
    return this.prisma.admin.findMany();
  }

  getAdminById(id: number) {
    return this.prisma.admin.findUnique({ where: { id } });
  }

  async createAdmin(data: Prisma.AdminCreateInput) {
    if (data.email) {
      const is_found = await this.prisma.admin.findUnique({
        where: { email: data.email as string },
      });
      if (is_found) throw new HttpException('Email already Taken', 400);
    }
    data.password = await bcrypt.hash(data.password, 10);
    return this.prisma.admin.create({ data });
  }

  async updateAdmin(id: number, data: Prisma.AdminUpdateInput) {
    const is_found = await this.getAdminById(id);
    if (!is_found) throw new HttpException('Admin Not Found', 404);

    if (data.email) {
      const is_found = await this.prisma.admin.findUnique({
        where: { email: data.email as string },
      });

      if (is_found) throw new HttpException('Email already Taken', 400);
    }

    return this.prisma.admin.update({ where: { id }, data });
  }

  async deleteUserById(id: number) {
    const is_found = await this.getAdminById(id);
    if (!is_found) throw new HttpException('Admin Not Found', 404);

    return this.prisma.admin.delete({ where: { id } });
  }
}
