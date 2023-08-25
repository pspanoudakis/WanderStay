import { useCallback } from "react";
import { PaginatedResultsWrapper } from "./PaginatedResultsWrapper"
import { ReviewTile } from "./ReviewTile"
import { fetchPropertyReviews } from "../api/fetchRoutines/propertyAPI";

interface ReviewsSectionProps{
    propertyId: number
}

export function ReviewsSection(props: ReviewsSectionProps){

    const fetchReviews = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchPropertyReviews({
                propertyId: props.propertyId,
                paginationInfo: {
                    pageNum,
                    pageSize
                }
            }).then(res => res.content);
        },
        [props.propertyId]
    )
    
    return(
        <div className="w-full flex justify-center">
            <div className="w-2/3 flex flex-col gap-4">
                <PaginatedResultsWrapper
                    pageSize={4}
                    idleTitleBuilder={(n) => `${n} Κριτικές`}
                    resultFetcher={fetchReviews}
                    resultRenderer={(r, key) => {
                        return (
                            <ReviewTile
                                key={key}
                                {...r}
                            />
                        )
                    }}
                />            
            </div>
        </div>
    )
}
