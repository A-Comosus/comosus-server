import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FindByIdInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
