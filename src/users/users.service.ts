import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Messages } from './entities/messages.entity';

@Injectable()
export class UsersService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const profile = new Profile({ ...createUserDto.profile });
      const user = new User({ ...createUserDto, messages: [], profile });
      const insertedUser = await this.entityManager.save(user);
      return insertedUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.entityManager.find(User, {
      relations: { profile: true, messages: true },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.entityManager.findOne(User, {
      where: { id },
      relations: { profile: true, messages: true },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.entityManager.findOne(User, { where: { id } });
      console.log(user);
      // if (!user) {
      //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      // }
      const messages = updateUserDto.messages.map(
        (message) => new Messages(message),
      );
      user.messages = messages;
      await this.entityManager.save(user);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
