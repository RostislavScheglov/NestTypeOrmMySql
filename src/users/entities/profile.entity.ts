import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column } from 'typeorm';

@Entity('profile')
export class Profile extends AbstractEntity<Profile> {
  @Column()
  name: string;

  @Column()
  surname: string;
}
