import { Field, ObjectType } from '@nestjs/graphql';

import { Link } from '@src/resource/link';

@ObjectType()
export class FindUserByUsernameResponse {
  @Field()
  id: string;

  @Field()
  displayName: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  bio: string;

  @Field(() => [Link])
  links: [Link];
}
