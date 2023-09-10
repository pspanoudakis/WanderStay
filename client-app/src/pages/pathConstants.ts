import { RoleType } from "../api/entities/RoleType";

export const ORDERED_BASE_ROLE_PATHS:
{[role in RoleType]: string} = {
    // Order is important!
    [RoleType.ADMIN]: '/admin',
    [RoleType.HOST]: '/host',
    [RoleType.GUEST]: '',
} as const;
