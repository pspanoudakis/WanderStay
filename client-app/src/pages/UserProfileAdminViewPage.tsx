import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { RoleType } from "../api/entities/RoleType";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UserDetails } from "../components/UserDetails";
import { DataExportTypeLabels } from "../components/utils/dataExportTypeLabels";
import { UserResponse } from "../api/responses/UserResponse";
import { FetchDataResponse, SupportedAcceptType } from "../api/fetchRoutines/fetchAPI";
import { 
    exportAllGuestReservations, 
    exportAllGuestReviews, 
    exportAllHostProperties, 
    exportAllHostReviews, 
    getUserProfile, 
    setUserIsActive
} from "../api/fetchRoutines/adminAPI";
import { useContext, useEffect, useState } from "react";
import { AppContext, openModal } from "../AppContext";
import { exportObjAsJSON, exportTextAsXML } from "../utils/exportUtils";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { PrimaryButton } from "../components/PrimaryButton";
import { useParams } from "react-router-dom";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { AccountStatusSection } from "../components/AccountStatusSection";

export function UserProfileAdminViewPage(){

    const ctx = useContext(AppContext);
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();
    const {username} = useParams();
    const [userInfo, setUserInfo] = useState<UserResponse>();
    const [loading, setLoading] = useState(true);
    const [exportType, setExportType] = useState<SupportedAcceptType>(
        SupportedAcceptType.APPLICATION_JSON
    );

    useEffect(() => {
        getUserProfile(String(username))
        .then(response => {
            if (navigateIfAuthFailed(response)) return;
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
                    if (navigateIfAuthFailed(response)) return;
                    openModal(ctx, {
                        content: () => (
                            <ModalActionResultTemplate
                                success={false}
                                errorText="Σφάλμα Εξαγωγής Δεδομένων"
                            />
                        )
                    });
                }
                setLoading(false);
            })
        }
    }

    const toggleUserIsActive = () => {
        if (userInfo) {
            const username = userInfo.user.username;
            setLoading(true)
            setUserIsActive(username, !userInfo?.user.active)
            .then(response => {
                if (navigateIfAuthFailed(response)) return;
                if (response.ok) {
                    setUserInfo(response.content);
                }
                else {
                    openModal(ctx, {
                        content: () => (
                            <ModalActionResultTemplate
                                success={false}
                                errorText="Σφάλμα Επεξεργασίας Λογαριασμού"
                            />
                        )
                    });
                }
                setLoading(false);
            });            
        }
    }
    
    return(
        userInfo ?
            <div 
                className="flex flex-col items-center h-2/5 gap-8 relative"
                style={{
                    width: '35%'
                }}
            >
                <LoadingSpinner
                    coverParent
                    visible={loading}
                    // text={`Εξαγωγή Δεδομένων ${DataExportTypeLabels[exportType]}`}
                    text={`Φόρτωση`}
                />
                <div className="flex flex-col gap-10 items-center w-full">
                    <UserDetails
                        userInfo={{
                            ...userInfo.user,
                            img: userInfo.user.image
                        }}
                        editable={false}
                        visibleRoles={Object.values(RoleType)}
                    />
                    <AccountStatusSection
                        isActive={userInfo.user.active}
                        editable={true}
                        toggleIsActive={toggleUserIsActive}
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
