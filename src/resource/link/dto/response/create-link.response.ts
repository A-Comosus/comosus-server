import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateLinkResponse {
  @Field()
  id: string;
}
