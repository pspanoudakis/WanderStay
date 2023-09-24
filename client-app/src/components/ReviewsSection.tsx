import { useCallback } from "react";
import { PaginatedResultsWrapper } from "./PaginatedResultsWrapper"
import { ReviewTile } from "./ReviewTile"
import { fetchPropertyReviews } from "../api/fetchRoutines/propertyAPI";
import { PropertyReviewsSummary } from "../api/entities/PropertyReviewsSummary";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ReviewsSectionProps{
    propertyId: number,
    summary: PropertyReviewsSummary,
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
            {
                props.summary.reviewCount ?
                <div className='flex items-center gap-1 text-lg'> 
                    <span className="font-bold ">Μέση Αξιολόγηση: {props.summary.avgStars}</span>
                    <FontAwesomeIcon icon={faStar} className="text-dark-petrol" />                             
                </div>
                :
                null
            }
                <PaginatedResultsWrapper
                    pageSize={4}
                    idleTitleBuilder={(n) => {
                        if (n > 1) {
                            return `${n} Κριτικές`
                        }
                        if (n == 0) {
                            return "Δεν υπάρχουν Κριτικές"
                        }
                        return `${n} Κριτική`
                    }}
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
