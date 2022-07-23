import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { PrismaService, AxiosService } from '@src/common';

import {
  CreateLinkInput,
  CreateLinkResponse,
  ReorderLinksOfUserInput,
  UpdateLinkInput,
} from './dto';
import { LinkType, SupportedType } from '@src/constants';

@Injectable()
export class LinkService {
  private readonly logger = new Logger(LinkService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly axiosService: AxiosService,
  ) {}

  async create({ userId }: CreateLinkInput): Promise<CreateLinkResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { links: true },
    });

    if (_.isNil(user))
      this.logger.error(`User with id ${userId} does not exist.`);

    const newLink = await this.prisma.link.create({
      data: {
        isDraft: true,
        isVisible: true,
        title: null,
        url: null,
        logoUrl: null,
        order: user.links.length,
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
    return await this.prisma.link.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });
  }

  async update({ id, isVisible, title, url }: UpdateLinkInput) {
    const linkToBeUpdated = await this.findLinkById(id);

    const updatedData = {
      isDraft: true,
      isVisible,
      title,
      url,
      type:
        SupportedType[new URL(url).hostname.replace('www.', '')] ??
        LinkType.Generic,
      logoUrl: linkToBeUpdated.logoUrl,
    };

    this.logger.log(`This link is validate with type of ${updatedData.type}`);

    // Validate url if it's different to the existing url.
    if (
      !_.isEmpty(url) &&
      !_.isEqual(url, linkToBeUpdated.url) &&
      updatedData.type !== LinkType.Video
    ) {
      const { title, site } = await this.axiosService.validateUrl(url);

      // Use the extracted title if the user did not specify one.
      if (_.isEmpty(updatedData.title) && !_.isNil(title))
        updatedData.title = title;
      const { logo } = site;
      if (logo) updatedData.logoUrl = logo;
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

  async reorderLinksOfUser({ userId, order }: ReorderLinksOfUserInput) {
    const reorderLinks = () => {
      return order.map((link, index) => {
        return this.prisma.link.update({
          where: { id: link },
          data: { order: index + 1 },
        });
      });
    };

    this.logger.log(`Returned list of updated link of user ${userId}.`);
    return await Promise.all(reorderLinks());
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
