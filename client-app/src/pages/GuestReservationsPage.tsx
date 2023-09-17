import { ReservationResultTile } from "../components/ReservationResultTile";
import { useCallback } from "react";
import { fetchGuestReservations, fetchUpcomingGuestReservations } from "../api/fetchRoutines/guestAPI";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";
import { PageTitledSection } from "../components/PageTitledSection";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";

const PAGE_SIZE = 4;
export function GuestReservationsPage(){

    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();

    const fetchReservationHistory = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchGuestReservations(pageNum, pageSize)
            .then(res => {
                navigateIfAuthFailed(res);
                return res.content;
            });
        },[]
    );
    const fetchUpcomingReservations = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchUpcomingGuestReservations(pageNum, pageSize)
            .then(res => {
                navigateIfAuthFailed(res);
                return res.content;
            });
        },[]
    );

    return (
        <div className="flex flex-col w-2/3 gap-8">
            <PageTitledSection title="Επερχόμενες Κρατήσεις">
                <PaginatedResultsWrapper
                    pageSize={PAGE_SIZE}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={fetchUpcomingReservations}
                    resultRenderer={(p, i) => {
                        return (
                            <ReservationResultTile
                                key={i}
                                reservationPreview={p}
                                baseNavPath={ORDERED_BASE_ROLE_PATHS.GUEST}
                            />
                        )
                    }}
                />
            </PageTitledSection>
            <PageTitledSection title="Ιστορικό Κρατήσεων">
                <PaginatedResultsWrapper
                    pageSize={PAGE_SIZE}
                    idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                    resultFetcher={fetchReservationHistory}
                    resultRenderer={(p, i) => {
                        return (
                            <ReservationResultTile
                                key={i}
                                reservationPreview={p}
                                baseNavPath={ORDERED_BASE_ROLE_PATHS.GUEST}
                            />
                        )
                    }}
                />
            </PageTitledSection>
        </div>
    );
}
