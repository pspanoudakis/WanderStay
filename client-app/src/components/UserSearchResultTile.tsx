import { Link } from "react-router-dom"
import { UserSearchResult } from "../api/responses/UserSearchResult"
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants"
import { RoleTypeLabels } from "./utils/userRoleLabels"
import { UserAccountStatusIndicator } from "./UserAccountStatusIndicator"

type UserSearchResultTileProps = {
    user: UserSearchResult
}

export function UserSearchResultTile({user}: UserSearchResultTileProps) {
    return (
        <Link 
            to={`${ORDERED_BASE_ROLE_PATHS.ADMIN}/users/${user.username}`}
            className="
                w-full flex rounded-md border-2 border-main-petrol px-4 py-2
                duration-300 hover:bg-xlight-petrol
            "
        >
            <div className="w-full grid grid-cols-3 grid-rows-2 gap-y-1">
                <span className="text-start text-lg font-semibold col-span-3">
                    {user.username}
                </span>
                <span className="flex justify-start items-center text-sm col-span-2 align-baseline">
                {
                    user.roles.map(r => RoleTypeLabels[r]).join(', ')
                }
                </span>
                <UserAccountStatusIndicator 
                    className="col-span-1 text-end"
                    isActive={user.isActive}
                />
            </div>
        </Link>
    );
}
