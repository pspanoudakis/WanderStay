import { Pagination } from "@mui/material";
import { PaginatedResponse } from "../api/responses/PaginatedResponse";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface PaginatedResultsWrapperProps<T> {
    resultFetcher: 
        (pageNumber: number, pageSize: number) => Promise<PaginatedResponse<T>>,

    resultsContainerRenderer?: (results: T[]) => JSX.Element,
    resultRenderer?: (result: T, key: number) => ReactNode,

    setExtLoading?: (loading: boolean) => void,
    loadingTitle?: string,
    idleTitleBuilder?: (numResults: number) => string,

    pageSize: number
}

export function PaginatedResultsWrapper<T>({
    resultFetcher,
    resultsContainerRenderer,
    resultRenderer,
    setExtLoading,
    loadingTitle,
    idleTitleBuilder,
    pageSize,
}: PaginatedResultsWrapperProps<T>) {

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(-1);
    const [results, setResults] = useState<T[]>([]);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        setCurrentPage(0);
        setTotalPages(-1);
    }, [resultFetcher]);

    const titleBuilder = useCallback((n: number) => {
        if (idleTitleBuilder) {
            return idleTitleBuilder(n);
        }
        if (n > 1) {
            return `Βρέθηκαν ${n} αποτελέσματα:`
        } else if (n === 1) {
            return `Βρέθηκε 1 αποτέλεσμα:`
        } else {
            return `Δεν βρέθηκαν αποτελέσματα.`;            
        }

    }, [idleTitleBuilder])

    const fetchResults = useCallback(() => {
        setLoading(true);
        setExtLoading?.(true);

        resultFetcher(currentPage, pageSize)
            .then(response => {
                setResults(response.content);
                setTotalPages(response.totalPages);
                setTotalElements(response.totalElements);
                setExtLoading?.(false);
                setLoading(false)               
            })

    }, [resultFetcher, currentPage, pageSize, setExtLoading]);

    // Initial or Fetcher changed
    useEffect(() => {
        fetchResults();
    }, [fetchResults]);
    
    return (        
        <div className="flex flex-col flex-1 relative">
            <div className={`
                    flex flex-row w-full 
                    ${totalElements ? 'justify-between' : 'justify-center items-center'}
                `}
            >
                {
                    loading && !results.length ? 
                        <span className="font-bold text-lg">
                            {loadingTitle}
                        </span>
                        :
                        <>
                            <span className="font-bold text-lg">
                                {titleBuilder(totalElements)}                            
                            </span>
                            {
                                Boolean(totalElements) &&
                                <Pagination 
                                    count={totalPages} 
                                    size="small" 
                                    color="primary"
                                    page={currentPage + 1}
                                    onChange={(_, p) => setCurrentPage(p - 1)}
                                />
                            }
                        </>
                }                                
            </div>
            {
                resultsContainerRenderer ?
                    resultsContainerRenderer(results)
                    :
                    <div className="flex flex-col w-full pt-3 gap-5">
                        {results.map((r, i) => resultRenderer?.(r, i))}
                    </div>
            }
            <LoadingSpinner 
                coverParent={results.length > 0} 
                customTwBgColor="bg-white/75"
                visible={loading}
            />
        </div>
    );

}
