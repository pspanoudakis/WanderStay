import { PaginatedResponse } from "../api/responses/PaginatedResponse";

interface PaginatedResultsWrapperProps<T> {
    resultFetcher: () => PaginatedResponse<T>,
    resultsContainerRenderer?: () => JSX.Element,
    resultRenderer: (result: T) => JSX.Element,
}

export function PaginatedResultsWrapper<T>({
    resultFetcher,
    resultsContainerRenderer,
    resultRenderer
}: PaginatedResultsWrapperProps<T>) {
    
    return (
        <div>Results</div>
    );

}
