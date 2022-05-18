import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindByUsernameArgs {
  @Field()
  @IsNotEmpty()
  username: string;
}
