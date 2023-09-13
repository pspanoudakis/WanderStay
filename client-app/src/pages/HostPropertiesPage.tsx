import { useCallback } from "react";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { fetchHostProperties } from "../api/fetchRoutines/hostAPI";
import { PageTitledSection } from "../components/PageTitledSection";
import { PropertyHostSidePreviewTile } from "../components/PropertyHostSidePreviewTile";

const PAGE_SIZE = 4;

export function HostPropertiesPage(){

    const fetchProperties = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchHostProperties(pageNum, pageSize)
            .then(res => {
                return res.content;
            });
        },[]
    );

    return (
        <div className="flex flex-col w-2/3">
            <PageTitledSection title="Τα Καταλύματά σας">
                <PaginatedResultsWrapper
                    pageSize={PAGE_SIZE}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={fetchProperties}
                    resultRenderer={(p, i) => {
                        return (
                            <PropertyHostSidePreviewTile
                                key={i}
                                property={p}
                            />
                        )
                    }}
                />
            </PageTitledSection>
        </div>
    );
}
