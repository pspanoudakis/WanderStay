import { Avatar } from "@mui/material"
import { Img } from "./Img"
import { APP_PALLETE } from "./utils/colorConstants"

type UserAvatarProps = {
    username?: string,
    imgId?: number | null
}

export function UserAvatar(props: UserAvatarProps) {
    return (
        props.imgId ?
        <Img
            imgId={props.imgId}
            className="rounded-full h-10 w-10"
        />
        :
        <Avatar 
            sx={{
                width: 40, 
                height: 40,
                bgcolor: APP_PALLETE['main-petrol']
            }}
        >
            {props.username?.charAt(0).toUpperCase()}
        </Avatar>
    );
}
