import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProfileByUsernameInput {
  @Field()
  @IsNotEmpty()
  username: string;
}
