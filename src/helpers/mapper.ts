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
    cityCode,
    picture,
    address,
  } = data;

  const userDto: UserDTO = {
    id,
    email,
    address,
    sponsorCode,
    firstName,
    lastName,
    role,
    cityCode,
    refreshToken,
    picture,
    refreshTokenExpires,
  };
  return userDto;
};
