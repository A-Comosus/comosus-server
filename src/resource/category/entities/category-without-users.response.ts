import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CategoryWithoutUsers {
  @Field()
  id: string;

  @Field()
  type: string;
}
