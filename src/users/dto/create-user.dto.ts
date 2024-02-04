import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  profile: CreateProfileDto;
}
