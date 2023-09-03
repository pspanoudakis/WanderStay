import * as React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import { AppContext } from "../AppContext";

interface MessagesProps{
    sender: string,
    text: string
}

export function Messages(props:MessagesProps){
    const ctx = React.useContext(AppContext)
    const isNotUser = ctx.state.businessContext.userContext?.username != props.sender
    return(
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
                {props.sender.toUpperCase().charAt(0)}
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
                <Typography variant="body1">{props.text}</Typography>
                </Paper>
            </Box>
            </Box>
    )
}