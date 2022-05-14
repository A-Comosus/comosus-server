import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'userById' })
  findById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @Query(() => User, { name: 'userByUsername' })
  findByUsername(@Args('username') username: string) {
    return this.userService.findByUsername(username);
  }
}
