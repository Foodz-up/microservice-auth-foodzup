import { UserEntity } from '../user/entity/user.entity';
import { UserDTO } from '../user/dto/user.dto';

export const toUserDTO = (data: UserEntity): UserDTO => {
    const { id, email } = data;
  
    let userDto: UserDTO = {
      id,
      email,
    };
  
    return userDto;
  };