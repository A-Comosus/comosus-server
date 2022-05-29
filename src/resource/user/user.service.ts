import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from '@src/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(_createUserInput: CreateUserInput) {
    return await this.prisma.user.create({ data: _createUserInput });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByUsername(_username: string) {
    return this.prisma.user.findFirst({ where: { username: _username } });
  }
}
