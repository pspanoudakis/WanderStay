import { RoleType } from "../entities/RoleType"

export type UserSearchResult = {
    username: string,
    isActive: boolean,
    roles: RoleType[],
};
