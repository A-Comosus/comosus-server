import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactFormResponse {
  @Field()
  status: string;
}
