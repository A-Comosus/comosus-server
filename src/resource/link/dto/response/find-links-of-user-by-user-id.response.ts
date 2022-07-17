import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FindLinksOfUserByUserIdResponse {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  order: number;

  @Field()
  isDraft: boolean;

  @Field()
  isVisible: boolean;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  url: string;
}
