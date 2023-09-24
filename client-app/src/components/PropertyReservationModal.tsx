import { useContext, useMemo, useState } from "react";
import { PropertyDetails } from "../api/responses/PropertyDetailsResponse";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { AppContext, openModal } from "../AppContext";
import { makePropertyReservation } from "../api/fetchRoutines/propertyAPI";
import { ModalActionResultTemplate } from "./ModalActionResultTemplate";
import dayjs from "dayjs";
import { LoadingSpinner } from "./LoadingSpinner";
import { PageTitleSpan } from "./PageTitleSpan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faHandshake, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { PrimaryButton } from "./PrimaryButton";

export function PropertyReservationModal({ property }: {
    property: PropertyDetails
}) {
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();
    const ctx = useContext(AppContext);
    const searchContext = ctx.state.businessContext.searchContext;

    const [loading, setLoading] = useState(false);

    const makeReservation = () => {
        setLoading(true);
        if (property) {
            makePropertyReservation(property.propertyId, {
                dateFrom: searchContext.dateFrom ?? '',
                dateTo: searchContext.dateTo ?? '',
                numPersons: searchContext.numPersons
            })
            .then(response => {
                if (navigateIfAuthFailed(response)) return;
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={response.ok}
                            successText="H Κράτησή σας ολοκληρώθηκε επιτυχώς"
                            errorText="Σφάλμα καταχώρησης Κράτησης"
                        />
                    )
                })
                setLoading(false);
            })
        }
    }

    const dailyCost = useMemo(() => (
        searchContext.numPersons * property.rules.perGuestCost + property.rules.baseDayCost
    ), [searchContext.numPersons, property.rules.perGuestCost, property.rules.baseDayCost]);    
    const dateFrom = useMemo(
        () => dayjs(searchContext.dateFrom), 
        [searchContext.dateFrom]
    );
    const dateTo = useMemo(
        () => dayjs(searchContext.dateTo),
        [searchContext.dateTo]
    );
    const durationInDays = useMemo(() => {
        return Math.ceil(
            (dateTo.valueOf() - dateFrom.valueOf()) /
            (1000 * 60 * 60 * 24)
        );
    }, [dateTo, dateFrom]);

    if (!dateFrom.isValid() || !dateTo.isValid()) {
        return (
            <ModalActionResultTemplate
                success={false}
                errorText="Παρακαλώ επιλέξτε ένα έγκυρο διάστημα στην μπάρα αναζήτησης."
            />
        );
    }
    
    return (
        <div className="w-96 flex flex-col justify-center items-center relative gap-5">
            <LoadingSpinner 
                coverParent
                visible={loading}
            />
            <PageTitleSpan>Η Κράτησή σας</PageTitleSpan>
            <div className="flex flex-col items-center text-lg gap-1">
                <span className="flex justify-start items-center gap-3">
                    <FontAwesomeIcon size="lg" icon={faCalendarAlt}/>
                    {searchContext.dateFrom} έως {searchContext.dateTo}
                </span>
                <span className="flex justify-start items-center gap-3">
                    <FontAwesomeIcon size="lg" icon={faUserGroup}/>
                    {`${searchContext.numPersons} ${searchContext.numPersons > 1 ? 'Επισκέπτες' : 'Επισκέπτης'}`}
                </span>
                <span className="flex justify-start items-center gap-3">
                    <FontAwesomeIcon size="lg" icon={faHandshake}/>
                    <span className="flex gap-1">
                    <b>{dailyCost * durationInDays}€</b>
                    {`(${dailyCost}€ / διανυκτέρευση)`}
                    </span>
                </span>
            </div>
            <PrimaryButton 
                classExtras="flex gap-3 items-center rounded-xl py-2 px-4 text-xl"
                onClick={makeReservation}
            >
                <FontAwesomeIcon icon={faCheck}/>
                Ολοκλήρωση Κράτησης
            </PrimaryButton>
        </div>
    );
}
