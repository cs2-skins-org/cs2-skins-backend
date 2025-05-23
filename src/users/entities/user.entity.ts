import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  steam_id: string;

  @Column()
  profile_url: string;

  @Column({ type: 'timestamp' })
  created_at: Date;
}

