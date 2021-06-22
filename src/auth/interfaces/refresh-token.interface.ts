import { JwtPayload } from "./payload.interface";

export interface RefreshToken {
    payload: JwtPayload;
    refreshToken: any;
}