import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
// import Role from './user.role';
import bcrypt from 'bcrypt';

enum Role {
  User = 0,
  Driver = 1,
  Restaurateur = 2
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  role: Role;

  @Column()
  password: string;

  @Column()
  refreshToken: string;

  @Column()
  countryCode: string;

  @Column()
  sponsorCode: string;

  @Column()
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()  async hashPassword() {
  this.password = await bcrypt.hash(this.password, 10);  
}
}
