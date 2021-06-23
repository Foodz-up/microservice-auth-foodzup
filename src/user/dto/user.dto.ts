import Role from '../entities/user.role';

export class UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  // password: string;
  refreshToken: string;
  refreshTokenExpires: string;
  countryCode: string;
  sponsorCode: string;
  profilePicture: string;
  // createdAt: Date;
  // updatedAt: Date;
}
