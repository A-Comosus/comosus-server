import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteLinkInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
