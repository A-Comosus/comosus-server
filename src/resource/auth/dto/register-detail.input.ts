import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Equals } from 'class-validator';

@InputType()
export class RegisterDetailInput {
  @Field()
  @IsEmail()
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
