import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { PrismaService, AxiosService } from '@src/common';

import { CreateLinkInput, CreateLinkResponse, UpdateLinkInput } from './dto';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly axiosService: AxiosService,
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

  async findLinksOfUserByUserId(userId: string) {
    this.logger.log(`Found and returning links of user ${userId}...`);
    return await this.prisma.link.findMany({ where: { userId } });
  }

  async update({ id, isVisible, title, url }: UpdateLinkInput) {
    const linkToBeUpdated = await this.findLinkById(id);

    const updatedData = {
      isDraft: true,
      isVisible,
      title: _.isEmpty(title) ? linkToBeUpdated.title : title,
      url,
      logoUrl: linkToBeUpdated.logoUrl,
    };

    // Validate url if it's different to the existing url.
    if (!_.isEqual(url, linkToBeUpdated.url) && !_.isEmpty(url)) {
      const {
        title,
        site: { logo },
      } = await this.axiosService.validateUrl(url);

      // Use the extracted title if the user did not specify one.
      if (_.isEmpty(updatedData.title)) {
        updatedData.title = title;
      }
      updatedData.logoUrl = logo;
    }

    // Check if link can be published
    updatedData.isDraft =
      _.isEmpty(updatedData.title) || _.isEmpty(updatedData.url) ? true : false;

    const updatedLink = await this.prisma.link.update({
      where: { id },
      data: {
        ...updatedData,
        updatedAt: new Date().toISOString(),
      },
    });

    if (updatedLink) {
      this.logger.log(`Updated link ${id}.`);
      return updatedLink;
    } else {
      this.logger.error(`Errored when updating link ${id}.`);
    }
  }

  async findLinkById(id: string) {
    this.logger.log(`Attempting to find link ${id}`);
    const link = await this.prisma.link.findUnique({ where: { id } });

    if (_.isNil(link)) {
      this.logger.error(`Cannot find link ${id}`);
    } else {
      return link;
    }
  }

  async deleteById(id: string) {
    const linkRemoved = await this.prisma.link.delete({ where: { id } });

    if (_.isNil(linkRemoved)) {
      this.logger.error(`Errored when deleting link with id ${id}.`);
    } else {
      this.logger.log(`Deleted link with id ${id}.`);
      return true;
    }
  }
}
