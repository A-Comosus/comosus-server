import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field(() => [String], { nullable: true })
  users: [string];
}
