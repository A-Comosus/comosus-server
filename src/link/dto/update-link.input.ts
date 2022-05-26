import { CreateLinkInput } from './create-link.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  enabled?: boolean;
}
