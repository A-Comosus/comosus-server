import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  isDraft: boolean;

  @Field()
  isVisible: boolean;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field({ nullable: true })
  logoUrl: string;

  @Field()
  userId: string;
}
