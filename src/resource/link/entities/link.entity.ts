import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field()
  id: string;

  @Field()
  isDraft: boolean;

  @Field()
  isVisible: boolean;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  logoUrl: string;

  @Field()
  userId: string;
}
