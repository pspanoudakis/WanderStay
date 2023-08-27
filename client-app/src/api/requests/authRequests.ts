import { RoleType } from "../entities/RoleType";

export type AuthRequest = {
    username: string,
    password: string,
}

export type RegisterUserRequest = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    roles: RoleType[]
} & AuthRequest;
