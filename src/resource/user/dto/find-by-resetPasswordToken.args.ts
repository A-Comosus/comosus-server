import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindByResetPasswordTokenArgs {
  @Field()
  @IsNotEmpty()
  resetPasswordToken: string;
}
