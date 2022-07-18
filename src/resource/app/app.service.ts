import { Injectable, Logger } from '@nestjs/common';
import { App } from './app.entity';
import { AxiosService } from '@src/common';
@Injectable()
export class AppService {
  constructor(private readonly axiosService: AxiosService) {}
  private readonly logger = new Logger(AppService.name);
  getServerInfo(): App {
    this.logger.log('Responding with server information...');
    return { status: 'Server is up' };
  }

  async getOrgInfo() {
    try {
      const data = await this.axiosService.getGithubOrgInfo();
      return data;
    } catch (err) {
      this.logger.error(`Failed to send email with ${err}`);
    }
  }

  async getGithubOrgMember() {
    try {
      const data = await this.axiosService.getGithubOrgMember();
      return data.map((member) => {
        return [member.url, member.avatar_url, member.login];
      });
    } catch (err) {
      this.logger.error(`Failed to get member info ${err}`);
    }
  }

  async getGithubOrgRepos() {
    try {
      const data = await this.axiosService.getGithubOrgRepos();
      return data.map((repo) => {
        const repoInfo = {};
        repo['name'] = repo.name;
        repo['fullname'] = repo.full_name;
        repo['owner'] = repo.owner.login;
        repo['link'] = repo.owner.html_url;
        return repoInfo;
      });
    } catch (err) {
      this.logger.error(`Failed to fetch Data ${err}`);
    }
  }

  async getRepoLanguages() {
    try {
      const data = await this.axiosService.getRepoLanguage();
      return data;
    } catch (err) {
      this.logger.error(`Failed to get repo languages ${err}`);
    }
  }
}
