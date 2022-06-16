import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindLinksOfUserByUserIdInput {
  @Field()
  @IsNotEmpty()
  userId: string;
}
