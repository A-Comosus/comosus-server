import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FindLinksOfUserByUserIdResponse {
  @Field()
  id: string;

  @Field()
  isVisible: boolean;

  @Field()
  title: string;

  @Field()
  url: string;
}
