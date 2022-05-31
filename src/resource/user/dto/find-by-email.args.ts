import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindByEmailArgs {
  @Field()
  @IsNotEmpty()
  email: string;
}
