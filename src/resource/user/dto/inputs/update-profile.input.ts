import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  displayName: string;

  @Field()
  bio: string;
}
