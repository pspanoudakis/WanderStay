import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RoleType } from "../api/entities/RoleType"
import { UserDetailsRequest } from "../api/requests/UserDetailsRequest"
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { CheckboxWithLabel } from "./CheckboxWithLabel"
import { RoleTypeLabels } from "./utils/userRoleLabels"
import { EditableTextField } from "./EditableTextField"
import { PageTitleSpan } from "./PageTitleSpan"
import { Img } from "./Img"
import { UserAvatar } from "./UserAvatar"
import { ImgUploadButton } from "./ImgUploadButton"
import { createEndPointUrl } from "../api/fetchRoutines/fetchAPI"
import { useContext, useState } from "react"
import { AppContext, openModal } from "../AppContext"
import { ModalActionResultTemplate } from "./ModalActionResultTemplate"
import { ImageEntity } from "../api/entities/ImageEntity"
import { LoadingSpinner } from "./LoadingSpinner"
import { Avatar } from "@mui/material"

type UserDetailsProps = {
    userInfo: UserDetailsRequest & {username: string, img?: ImageEntity | null},
    setUserInfo?: (newInfo: UserDetailsRequest) => void,
    setUserImage?: (img: ImageEntity) => void,
    visibleRoles: RoleType[]
    editable: boolean,
}

export function UserDetails({
    userInfo, 
    setUserInfo,
    setUserImage,
    editable,
    visibleRoles
}: UserDetailsProps) {
    
    const ctx = useContext(AppContext);
    const [uploadingImg, setUploadingImg] = useState(false);
    return (
        <>
            <LoadingSpinner
                visible={uploadingImg}
                coverParent={true}
                text="Ενημέρωση των στοιχείων σας"
            />
            <div className="flex flex-col items-center text-2xl gap-3">
                <div className="flex gap-3 items-center">
                    <UserAvatar 
                        imgId={userInfo.img?.imgId}
                        username={userInfo.username}
                    /> 
                    <span className="font-bold">{userInfo.username}</span>
                </div> 
                <PageTitleSpan>Προφίλ Χρήστη</PageTitleSpan>
            </div>
            {
                editable &&
                <>
                {
                    userInfo.img ?
                    <Avatar 
                        sx={{
                            width: 240, 
                            height: 240
                        }}
                    >
                        <Img
                            className="rounded-full h-60 w-60"
                            imgId={userInfo.img.imgId}
                        />
                    </Avatar>
                    
                    :
                    <FontAwesomeIcon className="text-main-petrol h-60 w-60" icon={faUserCircle} />

                }
                <ImgUploadButton
                    uploadURL={createEndPointUrl('/user/uploadImage')}
                    onStartUpload={() => setUploadingImg(true)}
                    onSuccess={newImg => {
                        setUserImage?.(newImg)
                        setUploadingImg(false);
                    }}
                    onError={() => 
                        openModal(ctx, {
                            content: () => (
                                <ModalActionResultTemplate
                                    success={false}
                                    errorText="Σφάλμα μεταφόρτωσης εικόνας"
                                />
                            )
                        })
                    }
                />
                </>
            }
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
