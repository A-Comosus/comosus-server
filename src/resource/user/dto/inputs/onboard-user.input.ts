import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OnboardUserInput {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  categoryId: string;
}
