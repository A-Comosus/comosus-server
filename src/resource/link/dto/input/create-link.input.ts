import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLinkInput {
  @Field()
  @IsNotEmpty()
  userId: string;
}
