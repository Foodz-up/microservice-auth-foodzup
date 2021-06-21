import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserDTO } from "src/user/dto/user.dto";
import { AuthService } from "../auth.service";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<UserDTO> {
        return await this.authService.validateCredentials(email, password);
    }
}