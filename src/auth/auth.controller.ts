import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/user.create.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { LoginUserDTO } from '../user/dto/user.login.dto';
import { JwtPayload } from './interfaces/payload.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(
        @Body() createUserDTO: CreateUserDTO,
    ): Promise < RegistrationStatus > {
        const result: RegistrationStatus = await this.authService.register(
            createUserDTO,
        );

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }

        return result;
    }

    @Post('login')
    public async login(@Body() loginUserDTO: LoginUserDTO): Promise < LoginStatus > {
        return await this.authService.login(loginUserDTO);
    }

    @Get('test')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise < JwtPayload > {
        return req.user;
    }
}