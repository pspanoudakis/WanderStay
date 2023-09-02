import { useContext, useEffect, useState } from "react";
import { AppContext, openModal } from "../AppContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { EditableTextField } from "../components/EditableTextField";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { RoleType } from "../api/entities/RoleType";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { RoleTypeLabels } from "../components/utils/userRoleLabels";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { UserDetailsRequest } from "../api/requests/UserDetailsRequest";
import { updateUserDetails } from "../api/fetchRoutines/userAPI";
import { LoadingSpinner } from "../components/LoadingSpinner";

export function UserProfilePage(){
    const ctx = useContext(AppContext);
    const businessContext = ctx.state.businessContext;

    const [userInfo, setUserInfo] = useState<UserDetailsRequest>({
        firstName: businessContext.userContext?.firstName ?? '',
        lastName: businessContext.userContext?.lastName ?? '',
        email: businessContext.userContext?.email ?? '',
        mobileNumber: businessContext.userContext?.mobileNumber ?? '',
        roles: businessContext.userContext?.roles ?? [],
    })
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (businessContext.userContext) {
            setUserInfo({
                ...businessContext.userContext
            })
        }
    }, [JSON.stringify(businessContext.userContext)])

    function saveUserInfo() {
        setLoading(true);
        updateUserDetails(userInfo)
        .then(response => {
            if (response.ok) {
                ctx.setState?.({
                    businessContext: {
                        ...businessContext,
                        userContext: response.content.user
                    },
                    modalContext: {
                        showModal: true,
                        modalProps: {
                            content: () => (
                                <ModalActionResultTemplate
                                    success={true}
                                    successText="Τα στοιχεία σας ενημερώθηκαν επιτυχώς."
                                />
                            )
                        }
                    }
                })
                setIsEditing(false);
            }
            else {
                openModal(ctx, {
                    content: () => (
                        <ModalActionResultTemplate
                            success={false}
                            errorText="Σφάλμα ενημέρωσης στοιχείων"
                        />
                    )
                })
            }
            setLoading(false);
        })
    }
    
    return(
        <div className="flex flex-col ml-10 h-2/3 gap-y-10 relative">
            <LoadingSpinner
                visible={loading}
                coverParent={true}
                text="Ενημέρωση των στοιχείων σας"
            />
            <div className="flex justify-start text-2xl gap-3 items-center">
                <FontAwesomeIcon icon={faUserCircle} className="text-main-petrol" size="xl"/>
                <span className="font-bold">{businessContext.userContext?.username}</span> 
                <span>Προσωπικά Στοιχεία</span>
            </div>
            <div className="flex flex-col items-start">
                <div className="flex gap-3 items-center">
                    <span className="text-xl font-bold">Ρόλος:</span>
                    <div className="flex flex-row">
                    {
                        [RoleType.GUEST, RoleType.HOST].map(targetRole => (
                            <CheckboxWithLabel
                                key={targetRole}
                                label={RoleTypeLabels[targetRole]}
                                isChecked={userInfo.roles.includes(targetRole)}
                                setIsChecked={(isChecked) => {
                                    isEditing &&
                                    setUserInfo({
                                        ...userInfo,
                                        roles: userInfo.roles.reduce(
                                            (newRoles, currRole) => {
                                                if (currRole !== targetRole) {
                                                    newRoles.push(currRole);
                                                }
                                                return newRoles
                                            },
                                            isChecked ? [targetRole] : []
                                        )
                                    })
                                }}
                            />
                        ))
                    }
                    </div>
                </div>
                
            </div>
            <EditableTextField
                text={userInfo.firstName}
                edit={isEditing}
                boxType="Όνομα"
                setText={(e) => {
                    setUserInfo?.({
                        ...userInfo,
                        firstName: e
                    })
                }}
            />
            <EditableTextField
                text={userInfo.lastName}
                edit={isEditing}
                boxType="Επίθετο"
                setText={(e) => {
                    setUserInfo?.({
                        ...userInfo,
                        lastName: e
                    })
                }}
            />
            <EditableTextField
                text={userInfo.email}
                edit={isEditing}
                boxType="Email"
                setText={(e) => {
                    setUserInfo?.({
                        ...userInfo,
                        email: e
                    })
                }}
            />
            <EditableTextField
                text={userInfo.mobileNumber}
                edit={isEditing}
                boxType="Τηλέφωνο"
                setText={(e) => {
                    setUserInfo?.({
                        ...userInfo,
                        mobileNumber: e
                    })
                }}
            />
            {
                isEditing ?
                <PrimaryButton
                    onClick={() => saveUserInfo()}
                >
                    Αποθήκευση
                </PrimaryButton>
                :
                <PrimaryButton
                    onClick={() => setIsEditing(true)}
                >
                    Επεξεργασία
                </PrimaryButton>
            }
        </div>
    )
}