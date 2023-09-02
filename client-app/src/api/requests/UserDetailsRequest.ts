import { RoleType } from "../entities/RoleType";

export type UserDetailsRequest = {
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    roles: RoleType[]
}
