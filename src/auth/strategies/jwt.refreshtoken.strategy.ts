import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import {Injectable, UnauthorizedException, Body} from '@nestjs/common';
import {UserService} from '../../user/user.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy,"jwt-refreshtoken") {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: 'My Secret Never let outsiders',
      passReqToCallback:true
    });
  }
 
  async validate(req,payload: any) {
    
    var user = await this.userService.getUser(payload.email);
    if(!user){
        throw new UnauthorizedException();
    }
    if(req.body.refreshToken != (await user).refreshToken){
        throw new UnauthorizedException();
    }
    if( new Date() > new Date((await user).refreshTokenExpires)){
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, email: payload.email };
  }
}