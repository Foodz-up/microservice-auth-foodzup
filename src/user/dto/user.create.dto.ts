import Role from '../entities/user.role';

export class CreateUserDTO {
  // id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
  cityCode: number;
  address: string;
  // refreshToken: string;
  // sponsorCode: string;
  // picture: string;
  // createdAt: Date;
  // updatedAt: Date;
}
