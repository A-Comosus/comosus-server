import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GitHubInfoReponse {
  @Field()
  gitHubInfo: any;
}

class GitHubInfo {
  @Field()
  memberInfo: any;
  @Field()
  orgInfo: any;
  @Field()
  repoInfo: any;
  @Field()
  repoLanguage: any;
}

class memberInfo {}

class orgInfo {}

class repoInfo {}

class repoLanguage {}
