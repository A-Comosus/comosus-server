import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginDetailInput {
  @Field() username: string;
  @Field() password: string;
}
