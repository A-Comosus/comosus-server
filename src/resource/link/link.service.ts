import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@src/common';
import { HttpService } from '@nestjs/axios';

import { CreateLinkInput, CreateLinkResponse, UpdateLinkInput } from './dto';
import { UrlMeta } from './constants/UrlMeta';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create({ userId }: CreateLinkInput): Promise<CreateLinkResponse> {
    const newLink = await this.prisma.link.create({
      data: {
        isDraft: true,
        isVisible: true,
        title: null,
        url: null,
        logoUrl: null,
        user: { connect: { id: userId } },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    });

    this.logger.log(`Created a new link for user ${userId}`);
    return { id: newLink.id };
  }

  async update(id: string, updatedData: UpdateLinkInput) {
    const updatedLink = await this.prisma.link.update({
      where: { id },
      data: {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedLink) {
      this.logger.log(`Updated link ${id}.`);
      this.validateLink(id);
      return true;
    } else {
      this.logger.error(`Errored when updating link ${id}.`);
      return false;
    }
  }

  async validateLink(id: string) {
    const linkToValidate = await this.prisma.link.findUnique({
      where: { id },
    });

    const { title, url } = linkToValidate;
    await this.prisma.link.update({
      where: { id },
      data: { isDraft: isNil(title) && isNil(url) ? true : false },
    });
  }

  async updateLinkUrl(id: string, url: string) {
    const linkToUpdate = await this.prisma.link.findUnique({ where: { id } });

    if (isNil(linkToUpdate)) {
      this.logger.error(`Cannot find link ${id}.`);
    }

    this.logger.log(`Validating url ${url} received..`);
    const encodedUrl = encodeURIComponent(url);
    const { data, status } = await this.httpService
      .get<UrlMetaResponse>(`${UrlMeta.API_URL}/?url=${encodedUrl}`, {
        headers: {
          Authorization: Buffer.from(
            this.configService.get(UrlMeta.URL_META_AUTH_STRING),
          ).toString('base64'),
        },
      })
      .toPromise();

    if (status !== HttpStatus.OK)
      this.logger.error('Request errored with Url Meta API');

    const { result, meta } = data;

    if (result.status === UrlMeta.RESULT_ERROR) {
      this.logger.error(`Failed to validate url. [Message: ${result.reason}]`);
    } else {
      this.logger.log(`Url validated, Updating it to link ${id}`);
      const {
        site: { logo },
        title,
      } = meta;

      return await this.update(id, {
        url,
        title: linkToUpdate.title ?? title,
        logoUrl: logo ?? '',
      });
    }
  }

  async delete(id: string) {
    const linkRemoved = await this.prisma.link.delete({ where: { id } });

    if (isNil(linkRemoved)) {
      this.logger.error(`Errored when deleting link with id ${id}.`);
    } else {
      this.logger.log(`Deleted link with id ${id}.`);
      return true;
    }
  }
}
