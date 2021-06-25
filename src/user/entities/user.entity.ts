import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

const argon = require('argon2');
// import Role from './user.role.js';

enum Role {
  User = 0,
  Driver = 1,
  Restaurateur = 2,
  Administrateur = 3,
}

@Entity()
export class User {
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
  refreshTokenExpires: string;

  @Column({ nullable: true })
  cityCode: number;

  @Column({ nullable: true })
  sponsorCode: string;

  @Column({ nullable: true })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert() async hashPassword() {
    this.password = await argon.hash(this.password, 10);
  }
}
