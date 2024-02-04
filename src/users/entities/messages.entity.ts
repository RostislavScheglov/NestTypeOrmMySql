import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('messages')
export class Messages extends AbstractEntity<Messages> {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;
}
