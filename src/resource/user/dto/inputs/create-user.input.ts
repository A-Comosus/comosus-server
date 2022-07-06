import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Equals } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @Equals(true)
  acceptPolicy: boolean;
}
