import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { RoleType } from "../api/entities/RoleType";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UserDetails } from "../components/UserDetails";
import { DataExportTypeLabels } from "../components/utils/dataExportTypeLabels";
import { UserResponse } from "../api/responses/UserResponse";
import { FetchDataResponse, SupportedAcceptType } from "../api/fetchRoutines/fetchAPI";
import { exportAllGuestReservations, exportAllGuestReviews, exportAllHostProperties, exportAllHostReviews, getUserProfile } from "../api/fetchRoutines/adminAPI";
import { useContext, useEffect, useState } from "react";
import { AppContext, openModal } from "../AppContext";
import { exportObjAsJSON, exportTextAsXML } from "../utils/exportUtils";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { PrimaryButton } from "../components/PrimaryButton";
import { useParams } from "react-router-dom";

export function UserProfileAdminViewPage(){

    const ctx = useContext(AppContext);
    const {username} = useParams();
    const [userInfo, setUserInfo] = useState<UserResponse>();
    const [loading, setLoading] = useState(true);
    const [exportType, setExportType] = useState<SupportedAcceptType>(
        SupportedAcceptType.APPLICATION_JSON
    );

    useEffect(() => {
        getUserProfile(String(username))
        .then(response => {
            if (response.ok) {
                setUserInfo(response.content)
            }
            setLoading(false);
        })
    }, [])

    const exportData = (
        fetcher: (
            username: string, 
            exportType: SupportedAcceptType
        ) => Promise<FetchDataResponse<any>>,
        filenameNoExtBuilder: (username: string) => string 
    ) => {
        if (userInfo) {
            const username = userInfo.user.username;
            setLoading(true);
            fetcher(username, exportType)
            .then(response => {
                if (response.ok) {
                    if (exportType === SupportedAcceptType.APPLICATION_JSON) {
                        exportObjAsJSON({
                            obj: response.content,
                            filenameNoExt: filenameNoExtBuilder(username)
                        });
                    } else if (exportType === SupportedAcceptType.APPLICATION_XML) {
                        exportTextAsXML({
                            text: response.content,
                            filenameNoExt: filenameNoExtBuilder(username)
                        });
                    }
                }
                else {
                    openModal(ctx, {
                        content: () => (
                            <ModalActionResultTemplate
                                success={false}
                                errorText="Σφάλμα Εξαγωγής Δεδομένων"
                            />
                        )
                    })
                }
                setLoading(false);
            })
        }
    }
    
    return(
        userInfo ?
            <div className="flex flex-col items-center w-1.3 h-2/3 gap-8 relative">
                <LoadingSpinner
                    coverParent
                    visible={loading}
                    text={`Εξαγωγή Δεδομένων ${DataExportTypeLabels[exportType]}`}
                />
                <div className="flex flex-col gap-9 items-center w-full">
                    <UserDetails
                        userInfo={{
                            ...userInfo.user
                        }}
                        editable={false}
                        visibleRoles={[RoleType.GUEST, RoleType.HOST]}
                    />
                </div>
                <div className="w-80 flex flex-col items-center gap-8">
                    <span className="text-2xl">Εξαγωγή Δεδομένων</span>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={exportType}
                        onChange={(e) => {
                            debugger;
                            setExportType(e.target.value as SupportedAcceptType)
                        }}
                    >
                    {
                        Object.entries(DataExportTypeLabels).map(([type, label]) => (
                        <FormControlLabel key={type} value={type} control={<Radio />} label={label} />
                        ))
                    }
                    </RadioGroup>
                    {
                        userInfo.user.roles.includes(RoleType.HOST) &&
                        <>
                        <PrimaryButton
                            classExtras="w-full rounded-xl py-1"
                            onClick={() => exportData(
                                exportAllHostReviews,
                                (username) => `${username}_host_reviews`
                            )}
                        >
                            Εξαγωγή Κριτικών Οικοδεσπότη
                        </PrimaryButton>
                        <PrimaryButton
                            classExtras="w-full rounded-xl px-4 py-1"
                            onClick={() => exportData(
                                exportAllHostProperties,
                                (username) => `${username}_host_properties`
                            )}
                        >
                            Εξαγωγή Καταλυμάτων Οικοδεσπότη
                        </PrimaryButton>                        
                        </>
                    }
                    {
                        userInfo.user.roles.includes(RoleType.GUEST) &&
                        <>
                        <PrimaryButton
                            classExtras="w-full rounded-xl px-4 py-1"
                            onClick={() => exportData(
                                exportAllGuestReviews,
                                (username) => `${username}_guest_reviews`
                            )}
                        >
                            Εξαγωγή Κριτικών Ενοικιαστή
                        </PrimaryButton>
                        <PrimaryButton
                            classExtras="w-full rounded-xl px-4 py-1"
                            onClick={() => exportData(
                                exportAllGuestReservations,
                                (username) => `${username}_guest_reservations`
                            )}
                        >
                            Εξαγωγή Κρατήσεων Ενοικιαστή
                        </PrimaryButton>                        
                        </>
                    }
                </div>
            </div>
        :
        (
            loading ?
            <LoadingSpinner
                visible
                text="Φόρτωση Δεδομένων Χρήστη"
            />
            :
            null
        )
    )
}
