import { useContext, useState } from "react";
import { RegisterUserRequest } from "../api/requests/authRequests";
import { PrimaryButton } from "../components/PrimaryButton";
import { RoleType } from "../api/entities/RoleType";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { RoleTypeLabels } from "../components/utils/userRoleLabels";
import { signUp } from "../api/fetchRoutines/authAPI";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AppContext } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { useNavigate } from "react-router-dom";
import { getBaseNavigationPath } from "../components/utils/getBaseNavigationPath";

type SignUpFormState = {
    confirmPwd: string,
} & RegisterUserRequest

export function SignUpForm() {

    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [userInfo, setUserInfo] = useState<SignUpFormState>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPwd: "",
        roles: []
    });

    const submitRequest = () => {
        setLoading(true);

        signUp(userInfo)
            .then(response => {
                ctx.setState?.({
                    businessContext: {
                        ...ctx.state.businessContext,
                        userContext: response.ok ? response.content.user : undefined
                    },
                    modalContext: {
                        showModal: true,
                        modalProps: {
                            content:
                                () => (
                                    <ModalActionResultTemplate
                                        success={response.ok}
                                        successText="Ο Λογαριασμός σας δημιουργήθηκε με επιτυχία."
                                        errorText="Σφάλμα κατά τη δημιουργία λογαριασμού."
                                    />
                                )
                        }
                    }
                })
                if (response.ok) {
                    navigate(`${getBaseNavigationPath(response.content.user.roles)}/`);
                }
                setLoading(false);                
            });
    }

    function updateUserInfoState(key: keyof SignUpFormState, value: string) {
        setUserInfo({
            ...userInfo,
            [key]: value
        });
    }

    return (
        <div className="flex flex-col border-2 border-main-petrol h-2/3 px-4 py-3 rounded-3xl items-center gap-y-5 relative">
            <LoadingSpinner
                coverParent={true}
                text="Δημιουργία Λογαριασμού..."
                visible={loading}
            />
            <b><h1 className="text-dark-petrol text-3xl mt-4">Εγγραφή</h1></b>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Όνομα Χρήστη</h2>
                    <input
                        type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.username} onChange={(e) => updateUserInfoState("username", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Ρόλος</h2>
                    <div className="flex flex-row">
                    {
                        [RoleType.GUEST, RoleType.HOST].map(targetRole => (
                            <CheckboxWithLabel
                                key={targetRole}
                                label={RoleTypeLabels[targetRole]}
                                isChecked={userInfo.roles.includes(targetRole)}
                                setIsChecked={(isChecked) => {
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
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Όνομα</h2>
                    <input
                        type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.firstName} onChange={(e) => updateUserInfoState("firstName", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επώνυμο</h2>
                    <input
                        type="text"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.lastName} onChange={(e) => updateUserInfoState("lastName", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Διεύθυνση email</h2>
                    <input
                        type="email"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.email} onChange={(e) => updateUserInfoState("email", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κινητό</h2>
                    <input
                        type="text"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.mobileNumber} onChange={(e) => updateUserInfoState("mobileNumber", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κωδικός</h2>
                    <input
                        type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.password} onChange={(e) => updateUserInfoState("password", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επιβεβαίωση Κωδικού</h2>
                    <input
                        type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.confirmPwd} onChange={(e) => updateUserInfoState("confirmPwd", e.target.value)}
                    />
                </div>
            </div>
            <PrimaryButton
                onClick={() => submitRequest()}
                disabled={false}
                classExtras="text-xl rounded-full px-6 py-1"
            >
                Εγγραφή
            </PrimaryButton>
        </div>
    )
}
