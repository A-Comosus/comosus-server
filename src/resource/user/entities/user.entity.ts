import { ObjectType, Field } from '@nestjs/graphql';
import { Link } from '@src/resource/link';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  status: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  categoryId: string;
}
