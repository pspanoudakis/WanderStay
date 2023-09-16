import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useCallback } from "react";
import { getAllPropertyConversations } from "../api/fetchRoutines/conversationAPI";
import { ConversationResultTile } from "../components/ConversationResultTile";

export function PropertyConversationsSection({ propertyId }: {
    propertyId: number
}) {

    const fetchConversationResults = useCallback(
        async (pageNum: number, pageSize: number) => {
            return getAllPropertyConversations(
                propertyId,
                pageNum, pageSize
            ).then(response => response.content);
        },
        [propertyId]
    )

    return (
        <div className="w-2/3">
            <PaginatedResultsWrapper
                pageSize={5}
                resultFetcher={fetchConversationResults}
                idleTitleBuilder={n => {
                    if (n > 1) {
                        return `${n} Συζητήσεις`
                    }
                    if (n == 0) {
                        return "Δεν υπάρχουν Συζητήσεις"
                    }
                    return `${n} Συζήτηση`
                }}
                loadingTitle="Ανάκτηση Συζητήσεων..."
                resultRenderer={c => (
                    <ConversationResultTile 
                        key={c.id}
                        conversationPreview={c}
                        propertyId={propertyId}
                    />
                )}
            />
        </div>
    );
}
