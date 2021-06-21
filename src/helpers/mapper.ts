import { User } from '../user/entities/user.entity';
import { UserDTO } from '../user/dto/user.dto';

export const toUserDTO = (data: User): UserDTO => {
    const { id, email } = data;
  
    let userDto: UserDTO = {
      id,
      email,
    };
  
    return userDto;
  };