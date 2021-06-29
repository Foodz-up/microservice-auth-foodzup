import Role from '../entities/user.role';

export class UpdateUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  // role: Role;
  password: string;
  // refreshToken: string;
  cityCode: number;
  sponsorCode: string;
  picture: string;
  address: string;
  // createdAt: Date;
  // updatedAt: Date;
}
