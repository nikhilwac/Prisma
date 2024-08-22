import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/createAdmin.dto';
import { UpdateAdminDto } from './dtos/updateAdmin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Get()
  getAdmin() {
    return this.adminService.getAdmin();
  }

  @Get(':id')
  getAdminById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAdminById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAdmin(@Body() createAdminDTO: CreateAdminDto) {
    const isCreated = await this.adminService.createAdmin(createAdminDTO);
    const { password, ...userDetails } = isCreated;
    return userDetails;
  }

  @Patch(':id')
  updateAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(id, updateAdminDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUserById(id);
  }
}
