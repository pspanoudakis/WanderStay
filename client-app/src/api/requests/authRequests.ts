import { UserDetailsRequest } from "./UserDetailsRequest";

export type AuthRequest = {
    username: string,
    password: string,
}

export type RegisterUserRequest = UserDetailsRequest & AuthRequest;
