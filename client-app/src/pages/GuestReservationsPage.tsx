import { ReservationResultTile } from "../components/ReservationResultTile";
import { useCallback } from "react";
import { fetchGuestReservations } from "../api/fetchRoutines/guestAPI";
import { PaginatedResultsWrapper } from "../components/PaginatedResultsWrapper";

const PAGE_SIZE = 4;

export function GuestReservationsPage(){

    const fetchReservations = useCallback(
        async (pageNum: number, pageSize: number) => {
            return fetchGuestReservations(pageNum, pageSize)
            .then(res => {
                return res.content;
            });
        },
        []
    );

    return (
        <div className="flex flex-col w-2/3">
            <PaginatedResultsWrapper
                pageSize={PAGE_SIZE}
                idleTitleBuilder={(n) => `Βρέθηκαν ${n} αποτελέσματα`}
                resultFetcher={fetchReservations}
                resultRenderer={(p, i) => {
                    return (
                        <ReservationResultTile
                            key={i}
                            reservationPreview={p}
                        />
                    )
                }}
            />
        </div>
    );
}