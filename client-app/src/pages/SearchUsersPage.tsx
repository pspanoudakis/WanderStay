import { useCallback, useState } from "react"
import { searchUsers } from "../api/fetchRoutines/adminAPI";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useParams, useSearchParams } from "react-router-dom";
import { UserSearchResultTile } from "../components/UserSearchResultTile";

const PAGE_SIZE = 4;
export function SearchUsersPage() {

    const [params, setParams] = useSearchParams();
    console.log(params.entries());
    const [usernamePattern, setUsernamePattern] = useState<string|null>(
        params.get('username')
    );
    const [isActive, setIsActive] = useState<boolean|null>(
        (params.get('isActive')) !== null ? 
        (params.get('isActive') === 'true') : null
    )

    const fetchUserResults = useCallback(
        async (pageNum: number, pageSize: number) => {
            return searchUsers({
                paginationInfo: {
                    pageNum,
                    pageSize
                },
                searchCriteria: {
                    usernamePattern,
                    isActive
                }
            }).then(res => {
                return res.content
            })
        }, [params.get('username'), params.get('isActive')]
    );

    return (
        <div>
            <PaginatedResultsWrapper
                pageSize={PAGE_SIZE}
                resultFetcher={fetchUserResults}
                resultRenderer={u => <UserSearchResultTile key={u.username} user={u}/>}
                idleTitleBuilder={n => `Βρέθηκαν ${n} χρήστες`}
                loadingTitle="Αναζήτηση Χρηστών"
            />
        </div>
    );
}
