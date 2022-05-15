import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserDetailInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
