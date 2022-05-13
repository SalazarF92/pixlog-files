import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column({ default: '', nullable: false })
  password: string;

  @Column({ default: '', nullable: true })
  salt?: string;
}
