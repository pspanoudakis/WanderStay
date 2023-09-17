import { ReservationResultTile } from "../components/ReservationResultTile";
import { useCallback } from "react";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { fetchHostReservations, fetchUpcomingHostReservations } from "../api/fetchRoutines/hostAPI";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";
import { PageTitledSection } from "../components/PageTitledSection";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";

const PAGE_SIZE = 4;

export function HostReservationsPage(){

    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();

    const fetchUpcomingReservations = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchUpcomingHostReservations(pageNum, pageSize)
            .then(res => {
                navigateIfAuthFailed(res);
                return res.content;
            });
        },[]
    );
    const fetchReservationHistory = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchHostReservations(pageNum, pageSize)
            .then(res => {
                navigateIfAuthFailed(res);
                return res.content;
            });
        },[]
    );

    return (
        <div className="flex flex-col w-2/3 gap-8">
            <PageTitledSection title="Επερχόμενες Κρατήσεις σε Καταλύματά σας">
                <PaginatedResultsWrapper
                    pageSize={PAGE_SIZE}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={fetchUpcomingReservations}
                    resultRenderer={(p, i) => {
                        return (
                            <ReservationResultTile
                                key={i}
                                reservationPreview={p}
                                baseNavPath={ORDERED_BASE_ROLE_PATHS.HOST}
                            />
                        )
                    }}
                />
            </PageTitledSection>
            <PageTitledSection title="Ιστορικό Κρατήσεων σε Καταλύματά σας">
                <PaginatedResultsWrapper
                    pageSize={PAGE_SIZE}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={fetchReservationHistory}
                    resultRenderer={(p, i) => {
                        return (
                            <ReservationResultTile
                                key={i}
                                reservationPreview={p}
                                baseNavPath={ORDERED_BASE_ROLE_PATHS.HOST}
                            />
                        )
                    }}
                />
            </PageTitledSection>
        </div>
    );
}
