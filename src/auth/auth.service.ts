import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { UserService } from '../user/user.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDTO } from '../user/dto/user.login.dto';
import { UserDTO } from '../user/dto/user.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { toUserDTO } from 'src/helpers/mapper';
const randtoken = require('rand-token');
require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDTO: CreateUserDTO): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    console.log({ userDTO });

    try {
      await this.userService.addUser(userDTO);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(loginUserDTO: LoginUserDTO): Promise<LoginStatus> {
    // find user in db
    const user = await this.userService.findByLogin(loginUserDTO);
    // console.log(user);

    return {
      accessToken: this.createToken(user),
      refreshToken: await this.generateRefreshToken(user.id),
      email: user.email,
    };
  }

  async validateUser(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.userService.findByPayload(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async validateCredentials(email: string, password: string): Promise<UserDTO> {
    const user = await this.userService.findByLogin({ email, password });

    if (user) {
      return user;
    }
  }

  createToken({ email }: UserDTO): any {
    const expiresIn = process.env.EXPIRESIN;

    const user: JwtPayload = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  async generateRefreshToken(userId): Promise<string> {
    const refreshToken = randtoken.generate(16);
    const expiryDate = new Date();
    expiryDate.setDate(
      expiryDate.getDate() + parseInt(process.env.REFRESHTOKEN_EXPIRES),
    );
    await this.userService.saveOrUpdateRefreshToken(
      refreshToken,
      userId,
      expiryDate,
    );

    return refreshToken;
  }
}
