import { ImageEntity } from "../entities/ImageEntity";
import { RoleType } from "../entities/RoleType";

export type UserResponse = {
    user: {
        username: string,
        image: ImageEntity | null,
        roles: RoleType[],
        email: string,
        firstName: string,
        lastName: string,
        mobileNumber: string,
        accountNonLocked: boolean,
        accountNonExpired: boolean,
        credentialsNonExpired: boolean,
        active: boolean,
        locked: boolean,
        enabled: boolean,
    }
}
