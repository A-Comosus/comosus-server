import { Logger, UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { JwtAuthGuard } from '@resource/auth/guards';
import { App } from './app.entity';
import { AppService } from './app.service';
import { GitHubInfoReponse } from './dtos/get-github-info.response';

@Resolver()
export class AppResolver {
  private readonly logger = new Logger(AppResolver.name);
  constructor(private readonly appService: AppService) {}

  @Query(() => App, { name: 'server' })
  @UseGuards(JwtAuthGuard)
  getServerInfo() {
    this.logger.log('Receiving request for server info...');
    return this.appService.getServerInfo();
  }
  @Query(() => GitHubInfoReponse)
  getGitHubInfo() {
    this.logger.log('Receiving request for GitHub info...');
    const memberInfo = this.appService.getGithubOrgMember;
    const orgInfo = this.appService.getOrgInfo;
    const repoInfo = this.appService.getGithubOrgRepos;
    const repoLanguage = this.appService.getRepoLanguages;
    const gitHubInfo = {
      memberInfo,
      orgInfo,
      repoInfo,
      repoLanguage,
    };
    return gitHubInfo;
  }
}
