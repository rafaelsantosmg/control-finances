import {
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
