import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class App {
  @Field()
  status: string;
}
