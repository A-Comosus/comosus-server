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

  async update(id: string, { enabled, title, url }: UpdateLinkInput) {
    const updatedLink = await this.prisma.link.update({
      where: { id },
      data: {
        enabled,
        title,
        url,
      },
    });

    return updatedLink;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
