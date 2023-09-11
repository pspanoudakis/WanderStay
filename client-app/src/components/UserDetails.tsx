import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RoleType } from "../api/entities/RoleType"
import { UserDetailsRequest } from "../api/requests/UserDetailsRequest"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { CheckboxWithLabel } from "./CheckboxWithLabel"
import { RoleTypeLabels } from "./utils/userRoleLabels"
import { EditableTextField } from "./EditableTextField"
import { PageTitleSpan } from "./PageTitleSpan"

type UserDetailsProps = {
    userInfo: UserDetailsRequest & {username: string},
    setUserInfo?: (newInfo: UserDetailsRequest) => void,
    visibleRoles: RoleType[]
    editable: boolean,
}

export function UserDetails({
    userInfo, 
    setUserInfo, 
    editable,
    visibleRoles
}: UserDetailsProps) {
    return (
        <>
            <div className="flex flex-col items-center text-2xl gap-3">
                <div className="flex gap-3 font-bold">
                    <FontAwesomeIcon icon={faUserCircle} className="text-main-petrol" size="xl"/>
                    {userInfo.username}
                </div> 
                <PageTitleSpan>Προσωπικά Στοιχεία</PageTitleSpan>
            </div>
            <div className="flex gap-3 items-center flex-wrap">
                <span className="text-xl font-bold">Ρόλος:</span>
                <div className="flex flex-row">
                {
                    visibleRoles.map(targetRole => (
                        <CheckboxWithLabel
                            key={targetRole}
                            label={RoleTypeLabels[targetRole]}
                            isChecked={userInfo.roles.includes(targetRole)}
                            setIsChecked={(isChecked) => {
                                editable &&
                                setUserInfo?.({
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
            <EditableTextField
                text={userInfo.firstName}
                edit={editable}
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
                edit={editable}
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
                edit={editable}
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
                edit={editable}
                boxType="Τηλέφωνο"
                setText={(e) => {
                    setUserInfo?.({
                        ...userInfo,
                        mobileNumber: e
                    })
                }}
            />
        </>
    )
}
