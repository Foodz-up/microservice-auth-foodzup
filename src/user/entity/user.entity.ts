import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
// import Role from './user.role';
const bcrypt = require('bcrypt');

enum Role {
  User = 0,
  Driver = 1,
  Restaurateur = 2
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true, unique: true })
  email: string;

  @Column({ default: Role.User })
  role: Role;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  countryCode: string;

  @Column({ nullable: true })
  sponsorCode: string;

  @Column({ nullable: true })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
