import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { toUserDTO } from '../helpers/mapper';
import { CreateUserDTO } from './dto/user.create.dto';
import { UpdateUserDTO } from './dto/user.update.dto';
import { LoginUserDTO } from './dto/user.login.dto';
import { comparePasswords } from '../helpers/utils';
import { from } from 'rxjs';
import { switchMap, map, catchError} from 'rxjs/operators';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users = await this.userRepo.find();
    return users;
  }

  async getUser(options?: object): Promise<UserDTO> {
    const user = await this.userRepo.findOne(options);
    return toUserDTO(user);
  }

  async findByLogin({ email, password }: LoginUserDTO): Promise<UserDTO> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDTO(user);
  }

  async findByPayload({ username }: any): Promise<UserDTO> {
    return await this.getUser({ where: { username } });
  }

  async addUser(userDTO: CreateUserDTO): Promise<UserDTO> {
    const { email, password } = userDTO;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({ where: { email } });
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: UserEntity = await this.userRepo.create({
        email,
      password,
    });

    await this.userRepo.save(user);

    return toUserDTO(user);
  }

  async updateUser(id: number, userDTO: UpdateUserDTO): Promise<UserDTO> {
      const { email } = userDTO;

     await this.userRepo.update(id, userDTO);

     return userDTO;
  }

  async deleteUser(id: number) {
    await this.userRepo.delete(id);
  }

  private _sanitizeUser(user: UserEntity) {
    delete user.password;
    return user;
  }
}