import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field()
  id: string;

  @Field()
  enabled: boolean;

  @Field()
  title: string;

  @Field()
  url: string;

  @Field()
  userId: string;
}
