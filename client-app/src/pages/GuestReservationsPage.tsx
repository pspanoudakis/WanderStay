import { ReservationResultTile } from "../components/ReservationResultTile";
import { useCallback } from "react";
import { fetchReservationResults } from "../api/fetchRoutines/guestAPI";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";

const PAGE_SIZE = 4;

export function GuestReservationsPage(){

    const fetchReservations = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchReservationResults(pageNum,pageSize)
            .then(res => {
                return res.content;
            });

        },
        []
    );

    return (
        <div className="flex w-full justify-start gap-10 h-full">
            <PaginatedResultsWrapper
                pageSize={PAGE_SIZE}
                idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                resultFetcher={fetchReservations}
                resultRenderer={(p) => {
                    return (
                        <ReservationResultTile
                            key={p.propertyId}
                            reservationPreview={p}
                        />
                    )
                }}
            />
        </div>
    );
}