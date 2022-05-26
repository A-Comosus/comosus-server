import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLinkInput {
  @Field()
  title: string;
  @Field()
  url: string;
  @Field()
  userId: string;
}
