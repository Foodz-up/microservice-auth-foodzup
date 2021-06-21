import Role from '../entities/user.role';

export class CreateUserDTO {
    // id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    password: string;
    // refreshToken: string;
    // countryCode: string;
    // sponsorCode: string;
    // profilePicture: string;
    // createdAt: Date;
    // updatedAt: Date;
}