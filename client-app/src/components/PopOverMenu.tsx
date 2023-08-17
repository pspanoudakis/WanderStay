import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBars, faUserPlus, faHouse, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const subMenuItems = [
    {
        textChoice: "Σύνδεση",
        icon: <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#6fb69e", }} />,
        url: "/signIn"
    },
    {
        textChoice: "Εγγραφή",
        icon: <FontAwesomeIcon icon={faUserPlus} style={{color: "#6fb69e"}}/>,
        url: "/signUp"
    },
    {
        textChoice: "Προσθέστε το κατάλυμά σας",
        icon: <FontAwesomeIcon icon={faHouse} style={{color: "#6fb69e"}}/>,
        url: "/"
    },
    {
        textChoice: "Βοήθεια",
        icon: <FontAwesomeIcon icon={faCircleInfo} style={{color: "#6fb69e"}}/>,
        url: "/"
    }
]

export function PopOverMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', outline: 'none' }}>
                <Tooltip title="Προφίλ Χρήστη">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, outline: 'none' }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <div className='flex gap-2 items-center border-2 border-main-petrol rounded-full px-2 py-1'>
                            <FontAwesomeIcon icon={faBars} className='text-main-petrol'/>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: "#6fb69e" }} />
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {
                    subMenuItems.map((item,index) =>
                        <MenuItem key={index}>
                            <Link to={item.url} className='flex gap-2 items-center w-full'>
                                {item.icon}
                                {item.textChoice}
                            </Link>
                        </MenuItem>
                    )
                }
            </Menu>
        </>
    );
}
