import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

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

  async validateUrl(url: string) {
    this.logger.log(`Validating url ${url} with UrlMeta API..`);
    const encodedUrl = encodeURIComponent(url);
    const encodedAuthString = Buffer.from(
      this.configService.get(EnvVar.UrlMetaAuthString),
    ).toString('base64');
    const authorization = `Basic ${encodedAuthString}`;

    const { data, status } =
      await this.httpService.axiosRef.get<UrlMetaResponse>(
        `${UrlMeta.API_URL}/?url=${encodedUrl}`,
        {
          headers: {
            authorization,
          },
        },
      );

    if (status !== HttpStatus.OK)
      this.logger.error('Request errored with Url Meta API');

    const { result, meta } = data;

    if (result.status === UrlMeta.RESULT_ERROR) {
      this.logger.error(`Failed to validate url. [Message: ${result.reason}]`);
    } else {
      this.logger.log(`Url validated.`);
      return meta;
    }
  }

  async sendEmail({ email, emailContent }) {
    return await this.httpService.axiosRef
      .post(this.configService.get(EnvVar.LambdaSendEmailEndpoint), {
        to: email,
        subject: 'Your Password Reset Link',
        text: emailContent,
        html: emailContent,
      })
      .then((res) => {
        if (res.status === HttpStatus.OK) {
          this.logger.log(`Lambda sendEmail succeeded`);
          return true;
        } else {
          this.logger.log(`Lambda sendEmail failed with ${res.data}`);
          return false;
        }
      })
      .catch((err) => {
        this.logger.error(`Lambda sendEmail failed with exception ${err}`);
        return false;
      });
  }
}
