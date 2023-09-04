import { Conversation } from "../entities/Conversation";
import { Message } from "../entities/Message";
import { convertToPaginatedResponse } from "../responses/PaginatedResponse";
import { PropertyConversationResult } from "../responses/PropertyConversationResult";
import { FetchDataHttpMethod, FetchDataResponse, createEndPointUrl, fetchData } from "./fetchAPI";

type ConversationAPIRequest = {
    controllerRelativeEndpoint: string,
    method: FetchDataHttpMethod,
    body?: any
}

async function sendConversationAPIRequest<T>(request: ConversationAPIRequest) {
    return await fetchData({
        endpoint: createEndPointUrl(`/conversation/${request.controllerRelativeEndpoint}`),
        method: request.method,
        useJwt: true,
        body: request.body
    }) as FetchDataResponse<T>;
}

export async function getGuestSideConversation(propertyId: number) {
    return await sendConversationAPIRequest<{conversation: Conversation}>({
        controllerRelativeEndpoint: `guestSide?propertyId=${propertyId}`,
        method: "GET"
    });
}

export async function getHostSideConversation(conversationId: number) {
    return await sendConversationAPIRequest<{conversation: Conversation}>({
        controllerRelativeEndpoint: `${conversationId}`,
        method: "GET"
    });
}

export async function sendMessageToConversation(conversationId: number, msgText: string) {
    return await sendConversationAPIRequest<{message: Message}>({
        controllerRelativeEndpoint: `${conversationId}`,
        method: "POST",
        body: { text: msgText }
    });
}

export async function getAllPropertyConversations(
    propertyId: number, pageNum: number, pageSize: number
) {
    return convertToPaginatedResponse<PropertyConversationResult>(
        await sendConversationAPIRequest<unknown>({
            controllerRelativeEndpoint: (
                `hostSearch?propertyId=${propertyId}&numPage=${pageNum}&pageSize=${pageSize}`
            ),
            method: 'GET'
        })
    );
}

export async function markConversationAsDeleted(conversationId: number) {
    return await sendConversationAPIRequest<undefined>({
        controllerRelativeEndpoint: `${conversationId}/markDeleted`,
        method: "POST"
    });
}
