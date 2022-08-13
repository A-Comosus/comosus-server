import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field({ nullable: true })
  avatarUrl: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  bio: string;

  @Field({ nullable: true })
  categoryId: string;
}
