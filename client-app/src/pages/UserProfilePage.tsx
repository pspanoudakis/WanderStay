import { useContext, useEffect, useState } from "react";
import { AppContext, AppContextType, openModal, setUserContext } from "../AppContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { RoleType } from "../api/entities/RoleType";
import { UserDetailsRequest } from "../api/requests/UserDetailsRequest";
import { updateUserDetails } from "../api/fetchRoutines/userAPI";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { UserDetails } from "../components/UserDetails";
import { useNavigateIfAuthenticationFailed } from "../hooks/useNavigateIfAuthenticationFailed";
import { AccountStatusSection } from "../components/AccountStatusSection";
import { useNavigate } from "react-router-dom";

function extractUserInfoFromCtx(ctx: AppContextType): UserDetailsRequest {
    const businessContext = ctx.state.businessContext;
    return {
        firstName: businessContext.userContext?.firstName ?? '',
        lastName: businessContext.userContext?.lastName ?? '',
        email: businessContext.userContext?.email ?? '',
        mobileNumber: businessContext.userContext?.mobileNumber ?? '',
        roles: businessContext.userContext?.roles ?? [],
    }
}

export function UserProfilePage(){
    const navigate = useNavigate();
    const navigateIfAuthFailed = useNavigateIfAuthenticationFailed();
    const ctx = useContext(AppContext);
    const businessContext = ctx.state.businessContext;

    const [userInfo, setUserInfo] = useState<UserDetailsRequest>(
        extractUserInfoFromCtx(ctx)
    );
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!businessContext.userContext) {
            navigate('/signIn');
            return;
        }
        setUserInfo(extractUserInfoFromCtx(ctx));
    }, [JSON.stringify(businessContext.userContext)])

    function cancelEditing() {
        setUserInfo(extractUserInfoFromCtx(ctx));
        setIsEditing(false);
    }

    function saveUserInfo() {
        setLoading(true);
        updateUserDetails(userInfo)
        .then(response => {
            if (navigateIfAuthFailed(response)) return;
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
                                    successText={
                                        'Τα στοιχεία σας ενημερώθηκαν επιτυχώς.' +
                                        (
                                            (!businessContext.userContext?.roles.includes(RoleType.HOST) &&
                                            response.content.user.roles.includes(RoleType.HOST)) ?
                                            ' O λογαριασμός σας ως Oικοδεσπότης είναι προς το παρόν απενεργοποιημένος.'
                                            :
                                            ''
                                        )
                                    }
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
        <div className="flex flex-col items-center w-1.3 h-2/3 gap-y-10 relative">
            <LoadingSpinner
                visible={loading}
                coverParent={true}
                text="Ενημέρωση των στοιχείων σας"
            />
            <div className="flex flex-col gap-y-10 items-center w-full">
                <UserDetails
                    userInfo={{
                        ...userInfo,
                        img: businessContext.userContext?.image,
                        username: String(businessContext.userContext?.username)
                    }}
                    setUserImage={img => {
                        if (businessContext.userContext) {
                            setUserContext(ctx, {
                                ...businessContext.userContext,
                                image: img
                            });                            
                        }
                    }}
                    editable={isEditing}
                    setUserInfo={setUserInfo}
                    visibleRoles={[RoleType.GUEST, RoleType.HOST]}
                />
                {
                    businessContext.userContext?.roles.includes(RoleType.HOST) &&
                    <AccountStatusSection
                        isActive={Boolean(businessContext.userContext?.active)}
                    />
                }
            </div>
            {
                isEditing ?
                <div className="flex w-full justify-between">
                    <button 
                        className="
                            bg-red-500 hover:bg-red-700 rounded-xl px-4
                            duration-300 text-white font-semibold
                        " 
                        onClick={cancelEditing}
                    >
                        Ακύρωση
                    </button>
                    <PrimaryButton onClick={saveUserInfo}>
                        Αποθήκευση
                    </PrimaryButton>
                </div>
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
