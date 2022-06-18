import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

import { UrlMeta } from '@src/constants/UrlMeta';
import { EnvVar, NodeEnv } from '@src/constants';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    const isStaging =
      this.configService.get(EnvVar.NodeEnv) === NodeEnv.Staging;
    if (isStaging) {
      this.httpService.axiosRef.interceptors.request.use((config) => {
        const { method, url, headers } = config;
        this.logger.log({ method, url, headers });
        return config;
      });
    }
  }

  validateUrl(url: string): Promise<AxiosResponse<UrlMetaResponse>> {
    const encodedUrl = encodeURIComponent(url);
    const encodedAuthString = Buffer.from(
      this.configService.get(EnvVar.UrlMetaAuthString),
    ).toString('base64');
    const authorization = `Basic ${encodedAuthString}`;

    return this.httpService.axiosRef.get<UrlMetaResponse>(
      `${UrlMeta.API_URL}/?url=${encodedUrl}`,
      {
        headers: {
          authorization,
        },
      },
    );
  }
}
