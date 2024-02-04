import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { CreateMessageDto } from './create-message.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  public: boolean;
  name: string;
  email: string;
  password: string;
  role: string;
  messages: CreateMessageDto[];
}
