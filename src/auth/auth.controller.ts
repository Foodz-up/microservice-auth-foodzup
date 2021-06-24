import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  Request,
  NotFoundException,
  Res,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDTO } from '../user/dto/user.login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { RefreshToken } from './interfaces/refresh-token.interface';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetUser } from './guards/get-user.decorator';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  public async register(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDTO,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDTO: LoginUserDTO): Promise<LoginStatus> {
    return await this.authService.login(loginUserDTO);
  }

  @Put('changePassword')
  // public async changePassword(@Body() loginUserDTO: LoginUserDTO): Promise<LoginStatus> {
  //   return await this.authService.login(loginUserDTO);
  // }
  @UseGuards(JwtAuthGuard, AuthenticatedGuard)
  @Post('refreshtoken')
  async refreshToken(@Body() body: RefreshToken): Promise<LoginStatus> {
    const { refreshToken, payload } = body;
    const user = await this.authService.validateUser(payload);

    if (user && refreshToken == user.refreshToken) {
      const refreshToken =
        Date.parse(user.refreshTokenExpires) > Date.now()
          ? user.refreshToken
          : this.authService.generateRefreshToken(user.id);
      return {
        accessToken: this.authService.createToken(user),
        refreshToken: refreshToken,
        email: user.email,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@GetUser() user, @Request() req, @Res() res) {
    const getUser = await this.userService.getUser(req.user.id);
    if (!getUser) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({ user });
  }
}
