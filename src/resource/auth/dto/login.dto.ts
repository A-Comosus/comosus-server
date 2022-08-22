import { InputType, Field, ObjectType, createUnionType } from '@nestjs/graphql';
import { User } from '@src/resource/user';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  username: string;

  @Field()
  @IsNotEmpty()
  password: string;
}

export const LoginResult = createUnionType({
  name: 'LoginResult',
  types: () => [LoginSuccess, LoginError] as const,
  resolveType: (value) => {
    if (value.accessToken) return LoginSuccess;
    if (value.code) return LoginError;

    return null;
  },
});

@ObjectType()
export class LoginSuccess {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class LoginError {
  @Field()
  code: string;

  @Field()
  message: string;

  @Field()
  key: string;
}
