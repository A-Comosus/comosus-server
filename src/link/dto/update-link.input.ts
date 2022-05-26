import { CreateLinkInput } from './create-link.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLinkInput extends PartialType(CreateLinkInput) {
  @Field(() => Int)
  id: number;
}
