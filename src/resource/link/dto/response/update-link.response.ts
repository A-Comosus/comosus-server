import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateLinkResponse {
  @Field()
  id: string;

  @Field()
  isVisible: boolean;

  @Field()
  title: string;

  @Field()
  url: string;
}
