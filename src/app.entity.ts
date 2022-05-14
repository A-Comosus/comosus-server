import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class App {
  @Field()
  status: string;
}
