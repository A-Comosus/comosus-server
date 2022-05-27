import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateLinkInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  enabled: boolean;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  url: string;
}
