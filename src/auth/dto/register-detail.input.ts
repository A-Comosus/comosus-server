import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterDetailInput {
  @Field() email: string;
  @Field() username: string;
  @Field() password: string;
}
