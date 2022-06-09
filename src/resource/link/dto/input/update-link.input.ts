import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateLinkInput {
  @Field()
  isDraft?: boolean;

  @Field()
  isVisible?: boolean;

  @Field()
  title?: string;

  @Field()
  url?: string;

  @Field()
  logoUrl?: string;
}
