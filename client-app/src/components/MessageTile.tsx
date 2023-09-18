import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { AppContext } from "../AppContext";
import { Message } from "../api/entities/Message";
import { APP_PALLETE } from "./utils/colorConstants";
import { UserAvatar } from "./UserAvatar";

interface MessageTileProps{
    userAvatars: {
        [username: string]: number | null | undefined
    }
    msg: Message
}

export function MessageTile(props:MessageTileProps){
    const username = React.useContext(AppContext).state.businessContext.userContext?.username;
    const isNotUser = username != props.msg.sentBy;
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isNotUser ? "flex-start" : "flex-end",
                mb: 2, 
            }}
            >
            <Box
                sx={{
                display: "flex",
                flexDirection: isNotUser ? "row" : "row-reverse",
                alignItems: "start",
                }}
            >
            {
                (props.userAvatars[props.msg.sentBy] != null) ?
                <UserAvatar
                    imgId={props.userAvatars[props.msg.sentBy]}
                    username={props.msg.sentBy}
                />
                :
                <Avatar 
                    className="border-2 border-main-petrol"
                    sx={{
                        width: 40, 
                        height: 40,
                        color: isNotUser ? APP_PALLETE["dark-petrol"] : 'white',
                        bgcolor: isNotUser ? "primary.light" : "primary.main" ,
                        mt: 0.2
                    }}
                >
                    {props.msg.sentBy.toUpperCase().charAt(0)}
                </Avatar>
            }
                <div 
                    className={`flex flex-col ${isNotUser ? 'items-start' : 'items-end'}`}
                    style={{
                        marginLeft: '0.5rem',
                        marginRight: '0.5rem',
                    }}
                >
                    <Paper
                        className="w-max max-w-xl text-start"
                        variant="outlined"
                        sx={{
                            py: 1,
                            px: 1.5,
                            color: isNotUser ? "black" : "white",
                            backgroundColor: isNotUser ? "primary.light" : "primary.main",
                            borderRadius: isNotUser ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                        }}
                    >
                        <Typography variant="body1">{props.msg.text}</Typography>
                    </Paper>
                    <span className={`text-xs ${isNotUser ? 'text-start' : 'text-end'} mx-1`}>
                        {props.msg.sentOn}
                    </span>
                </div>
            </Box>
            </Box>
    )
}
