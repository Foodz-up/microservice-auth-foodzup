import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { toUserDTO } from '../helpers/mapper';
import { CreateUserDTO } from './dto/user.create.dto';
import { UpdateUserDTO } from './dto/user.update.dto';
import { LoginUserDTO } from './dto/user.login.dto';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { comparePasswords } from '../helpers/utils';
import { from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ChangePasswordUserDTO } from './dto/user.changePassword';
const argon = require('argon2');
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
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
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        "Vous n'avez pas de compte actif",
        HttpStatus.NOT_FOUND,
      );
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException(
        'Le mot de passe inscrit ne correspond pas à celui attendu',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return toUserDTO(user);
  }

  async findByPayload({ email }: any): Promise<UserDTO> {
    return await this.getUser({
      where: {
        email,
      },
    });
  }

  async addUser(userDTO: CreateUserDTO): Promise<UserDTO> {
    const { email } = userDTO;

    // check if the user exists in the db
    const userInDb = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (userInDb) {
      throw new HttpException(
        'Cette adresse email est déjà utilisée. Vous pouvez vous y connecter en cliquant sur le bouton "J\'ai déjà un compte"',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user: User = await this.userRepo.create(userDTO);

    await this.userRepo.save(user);

    return toUserDTO(user);
  }

  async updateUser(id: number, userDTO: UpdateUserDTO): Promise<UpdateUserDTO> {
    const { password } = userDTO;

    // await this.userRepo.findOneAndUpdate({ password }, userDTO);
    const user = await this.userRepo.findOne(id);

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException(
        "Votre mot de passe n'est pas valide",
        HttpStatus.BAD_REQUEST,
      );
    }

    delete userDTO.password;

    await this.userRepo.update(id, userDTO);

    return userDTO;
  }

  async deleteUser(id: number) {
    await this.userRepo.delete(id);
  }

  async saveOrUpdateRefreshToken(
    refreshToken: string,
    id: number,
    refreshTokenExpires,
  ) {
    await this.userRepo.update(id, { refreshToken, refreshTokenExpires });
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }

  async changeSponsorCode(id: number, sponsorCode: string) {
    const user = await this.userRepo.update(id, {
      sponsorCode,
    });
    return { user, sponsorCode };
  }

  async changePassword(
    id: number,
    changePasswordUserDTO: ChangePasswordUserDTO,
  ): Promise<any> {
    const { oldPassword, newPassword, confirmPassword } = changePasswordUserDTO;
    console.log({ oldPassword, newPassword, confirmPassword });

    if (newPassword === '' || oldPassword === newPassword) {
      throw new HttpException(
        'Veuillez définir un nouveau mot de passe',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (newPassword !== confirmPassword) {
      throw new HttpException(
        'Le mot de passe de confirmation est différent du nouveau mot de passe',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userRepo.findOne({ id });
    // compare passwords
    const areEqual = await comparePasswords(user.password, oldPassword);

    if (!areEqual) {
      throw new HttpException(
        "Votre ancien mot de passe n'est pas valide",
        HttpStatus.BAD_REQUEST,
      );
    }

    const newPasswordHashed = await argon.hash(newPassword, 10);
    const users = await this.userRepo.update(id, {
      password: newPasswordHashed,
    });
    return users;
  }
}
