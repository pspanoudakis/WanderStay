import { useCallback } from "react";
import { PaginatedResultsWrapper } from "./PaginatedResultsWrapper"
import { ReviewTile } from "./ReviewTile"

interface ReviewsSectionProps{
    propertyId: number
}

export function ReviewsSection(props: ReviewsSectionProps){
    
    return(
        <div className="flex flex-col gap-4 items-center">
            <div>
                {/* <PaginatedResultsWrapper
                    pageSize={4}
                    resultRenderer={(p, key) => {
                        return (
                            <ReviewTileSection/>
                        )
                    }}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={}
                /> */}
            </div>
            
        </div>
    )
}