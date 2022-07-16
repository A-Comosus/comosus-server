import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ReorderLinksOfUserInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field(() => [String])
  order: string[];
}
