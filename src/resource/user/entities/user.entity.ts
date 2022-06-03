import { ObjectType, Field } from '@nestjs/graphql';
import { Link } from '@src/resource/link/entities/link.entity';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => [Link])
  links: [Link];
}
