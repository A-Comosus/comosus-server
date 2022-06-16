import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateLinkInput {
  @Field()
  id: string;

  @Field()
  isVisible: boolean;

  @Field()
  title: string;

  @Field()
  url: string;
}
