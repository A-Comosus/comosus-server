import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class ContactFormInput {
  @Field()
  @IsNotEmpty()
  customerName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsNotEmpty()
  message: string;
}
