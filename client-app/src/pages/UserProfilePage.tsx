import { useContext, useState } from "react";
import { AppContext, UserContext, openModal } from "../AppContext";
import { PrimaryButton } from "../components/PrimaryButton";
import { EditableTextField } from "../components/EditableTextField";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { RoleType } from "../api/entities/RoleType";
import { CheckboxWithLabel } from "../components/CheckboxWithLabel";
import { RoleTypeLabels } from "../components/utils/userRoleLabels";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle} from '@fortawesome/free-solid-svg-icons'

export function UserProfilePage(){
    const ctx = useContext(AppContext);
    const businessContext = ctx.state.businessContext;

    const [userInfo, setUserInfo] = useState({
        username: businessContext.userContext?.username ?? '',
        firstName: businessContext.userContext?.firstName ?? '',
        lastName: businessContext.userContext?.lastName ?? '',
        email: businessContext.userContext?.email ?? '',
        mobileNumber: businessContext.userContext?.mobileNumber ?? '',
        roles: businessContext.userContext?.roles ?? [],
    })
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    function saveUserInfo() {
        setIsEditing(false);
    }
    
    return(
        <div className="flex flex-col ml-10 h-2/3 gap-y-10">
            
            <div className="flex justify-start text-2xl gap-3 items-center">
                <FontAwesomeIcon icon={faUserCircle} className="text-main-petrol" size="xl"/>
                <span className="font-bold">{userInfo.username}</span> 
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