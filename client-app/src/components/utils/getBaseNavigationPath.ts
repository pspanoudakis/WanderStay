import { RoleType } from "../../api/entities/RoleType";
import { ORDERED_BASE_ROLE_PATHS } from "../../pages/pathConstants";

export function getBaseNavigationPath(userRoles?: RoleType[]) {
    if (userRoles) {
        for (const role in ORDERED_BASE_ROLE_PATHS) {
            if (userRoles.includes(role as RoleType)) {
                return ORDERED_BASE_ROLE_PATHS[role as RoleType];
            }
        }        
    }
    return "";
}
