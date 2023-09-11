import { Link } from "react-router-dom"
import { UserSearchResult } from "../api/responses/UserSearchResult"
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants"

type UserSearchResultTileProps = {
    user: UserSearchResult
}

export function UserSearchResultTile({user}: UserSearchResultTileProps) {
    return (
        <Link 
            to={`${ORDERED_BASE_ROLE_PATHS.ADMIN}/users/${user.username}`}
        >
            <span>{user.username}</span>        
        </Link>
    );
}
