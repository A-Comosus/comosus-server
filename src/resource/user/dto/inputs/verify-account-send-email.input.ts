import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class VerifyAccountSendEmailInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
