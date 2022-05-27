import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  prisma = new PrismaClient();

  async create(_createUserInput: CreateUserInput) {
    return await this.prisma.user.create({ data: _createUserInput });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByUsername(_username: string) {
    return this.prisma.user.findFirst({
      where: { username: _username },
      include: { links: true },
    });
  }
}
