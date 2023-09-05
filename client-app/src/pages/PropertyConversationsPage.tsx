import { useParams } from "react-router-dom";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { useCallback } from "react";
import { getAllPropertyConversations } from "../api/fetchRoutines/conversationAPI";
import { ConversationResultTile } from "../components/ConversationResultTile";

export function PropertyConversationsPage() {

    const propertyId = Number(useParams()['propertyId']);

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
                pageSize={2}
                resultFetcher={fetchConversationResults}
                idleTitleBuilder={n => `Βρέθηκαν ${n} Συζητήσεις`}
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
