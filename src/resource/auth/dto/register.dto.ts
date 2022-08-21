import { createUnionType, ObjectType, InputType, Field } from '@nestjs/graphql';
import { User } from '@src/resource/user';

import {
  IsEmail,
  IsNotEmpty,
  Equals,
  Matches,
  IsLowercase,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @IsLowercase()
  email: string;

  @Field()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]*$/g)
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @Equals(true)
  acceptPolicy: boolean;
}

export const RegisterResult = createUnionType({
  name: 'RegisterResult',
  types: () => [RegisterSuccess, RegisterError] as const,
  resolveType(value) {
    if (value.user) {
      return RegisterSuccess;
    }
    if (value.code) {
      return RegisterError;
    }
    return null;
  },
});

@ObjectType()
export class RegisterSuccess {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class RegisterError {
  @Field()
  code: string;

  @Field()
  message: string;

  @Field()
  key: string;
}
