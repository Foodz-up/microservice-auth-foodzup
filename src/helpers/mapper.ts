import { User } from '../user/entities/user.entity';
import { UserDTO } from '../user/dto/user.dto';

export const toUserDTO = (data: User): UserDTO => {
  const {
    id,
    email,
    refreshToken,
    refreshTokenExpires,
    sponsorCode,
    firstName,
    lastName,
    role,
    countryCode,
    profilePicture,
  } = data;

  const userDto: UserDTO = {
    id,
    email,
    sponsorCode,
    firstName,
    lastName,
    role,
    countryCode,
    refreshToken,
    profilePicture,
    refreshTokenExpires,
  };
  return userDto;
};
