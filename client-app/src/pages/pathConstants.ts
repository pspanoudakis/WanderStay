import { RoleType } from "../api/entities/RoleType";

export const BASE_ROLE_PATHS = {
    [RoleType.GUEST]: '',
    [RoleType.ADMIN]: 'admin',
    [RoleType.HOST]: 'host',
}
