import { createUnionType, ObjectType, InputType, Field } from '@nestjs/graphql';
import { User } from '@src/resource/user';

import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  acceptPolicy: boolean;
}

export const RegisterResult = createUnionType({
  name: 'RegisterResult',
  types: () => [RegisterSuccess, RegisterError] as const,
  resolveType(value) {
    if (value.accessToken) {
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
