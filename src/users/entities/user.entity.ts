import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Messages } from './messages.entity';
import { AbstractEntity } from 'src/database/abstract.entity';

@Entity('user')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Messages, (messages) => messages.user, { cascade: true })
  @JoinColumn()
  messages: Messages[];
}
