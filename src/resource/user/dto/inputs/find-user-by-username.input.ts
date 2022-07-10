import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindUserByUsernameInput {
  @Field()
  @IsNotEmpty()
  username: string;
}
