import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@src/resource/user';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}
