import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ForgetPasswordInput {
  @Field()
  @IsNotEmpty()
  email: string;
}
