import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field(() => [CategoryUser], { nullable: true })
  users: [CategoryUser];
}

@ObjectType()
class CategoryUser {
  @Field()
  id: string;

  @Field()
  username: string;
}
