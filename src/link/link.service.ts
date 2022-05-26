import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateLinkInput, UpdateLinkInput } from './dto';

@Injectable()
export class LinkService {
  prisma = new PrismaClient();

  async create({ title, url, userId }: CreateLinkInput) {
    const newLink = await this.prisma.link.create({
      data: {
        enabled: true,
        title,
        url,
        user: { connect: { id: userId } },
      },
    });

    return newLink;
  }

  findAll() {
    return `This action returns all link`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkInput: UpdateLinkInput) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
