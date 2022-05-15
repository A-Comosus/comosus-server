import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  private readonly mockUsers = [
    { id: 1, username: 'norris', password: 'norris' },
    { id: 2, username: 'max', password: 'max' },
  ];

  create(_createUserInput: CreateUserInput) {
    const newUser = {
      ..._createUserInput,
      id: this.mockUsers.length + 1,
    };

    this.mockUsers.push(newUser);

    return newUser;
  }

  findAll() {
    return this.mockUsers;
  }

  findById(_id: number) {
    return this.mockUsers.find((user) => user.id === _id);
  }

  findByUsername(_username: string) {
    return this.mockUsers.find((user) => user.username === _username);
  }
}
