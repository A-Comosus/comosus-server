import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class VerifyEmailInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
