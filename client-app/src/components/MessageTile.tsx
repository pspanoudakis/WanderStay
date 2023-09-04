import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { AppContext } from "../AppContext";
import { Message } from "../api/entities/Message";

interface MessageTileProps{
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
                alignItems: "center",
                }}
            >
                <Avatar sx={{ bgcolor: isNotUser ? "primary.main" : "secondary.main" }}>
                {props.msg.sentBy.toUpperCase().charAt(0)}
                </Avatar>
                <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    ml: isNotUser ? 1 : 0,
                    mr: isNotUser ? 0 : 1,
                    backgroundColor: isNotUser ? "primary.light" : "secondary.light",
                    borderRadius: isNotUser ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
                }}
                >
                <Typography variant="body1">{props.msg.text}</Typography>
                </Paper>
            </Box>
            </Box>
    )
}
