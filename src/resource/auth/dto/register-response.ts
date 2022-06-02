import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponse {
  @Field()
  id: string;
}
