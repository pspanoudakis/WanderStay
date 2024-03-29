import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faBars, faUserPlus, faHouse, faRightFromBracket, faAddressCard, faHouseMedical, faGlasses, faUsers, faBellConcierge } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from "react-router-dom";
import { APP_PALLETE } from './utils/colorConstants';
import { AppContext, UserContext, clearUserContext } from '../AppContext';
import { clearJwt } from '../api/jwt/jwt';
import { RoleType } from '../api/entities/RoleType';
import { getBaseNavigationPath } from './utils/getBaseNavigationPath';
import { ORDERED_BASE_ROLE_PATHS } from '../pages/pathConstants';
import { UserAvatar } from './UserAvatar';

function getMenuItems(userCtx: UserContext | undefined): {
    textChoice: string,
    icon: JSX.Element,
    url: string,
}[] {
    const color = APP_PALLETE['main-petrol'];
    if (!userCtx) {
        return [
            {
                textChoice: "Σύνδεση",
                icon: <FontAwesomeIcon icon={faRightToBracket} style={{ color }} />,
                url: "/signIn"
            },
            {
                textChoice: "Εγγραφή",
                icon: <FontAwesomeIcon icon={faUserPlus} style={{ color }}/>,
                url: "/signUp"
            },
        ];
    }
    const items = [{
        textChoice: "Το Προφίλ μου",
        icon: <FontAwesomeIcon icon={faAddressCard} style={{ color }} />,
        url: `${getBaseNavigationPath(userCtx.roles)}/profile`
    }];
    
    if (userCtx?.roles.includes(RoleType.ADMIN)) {
        items.push(
            {
                textChoice: "Διαχείριση Χρηστών",
                icon: <FontAwesomeIcon icon={faUsers} style={{ color }}/>,
                url: `${ORDERED_BASE_ROLE_PATHS.ADMIN}/searchUsers`
            },
        );
    }
    if (userCtx?.roles.includes(RoleType.HOST)) {
        items.push(
            {
                textChoice: "Κρατήσεις Καταλυμάτων",
                icon: <FontAwesomeIcon icon={faBellConcierge} style={{ color }}/>,
                url: `${ORDERED_BASE_ROLE_PATHS.HOST}/reservations`
            },
            {
                textChoice: "Διαχείριση Καταλυμάτων",
                icon: <FontAwesomeIcon icon={faHouse} style={{ color }}/>,
                url: `${ORDERED_BASE_ROLE_PATHS.HOST}/properties`
            },
            {
                textChoice: "Καταχώρηση νέου Καταλύματος",
                icon: <FontAwesomeIcon icon={faHouseMedical} style={{ color }}/>,
                url: `${ORDERED_BASE_ROLE_PATHS.HOST}/property/new`
            },
            
        );
    }
    if (userCtx?.roles.includes(RoleType.GUEST)) {
        items.push(
            {
                textChoice: "Οι Κρατήσεις μου",
                icon: <FontAwesomeIcon icon={faGlasses} style={{color: APP_PALLETE['main-petrol']}}/>,
                url: `${ORDERED_BASE_ROLE_PATHS.GUEST}/reservations`
            },
        );
    }
    return items;
}

export function PopOverMenu() {

    const navigate = useNavigate();

    const ctx = useContext(AppContext);
    const userCtx = ctx.state.businessContext.userContext;
    const logOut = () => {
        clearJwt();
        clearUserContext(ctx);
        navigate("/");
    }    

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
                            <UserAvatar
                                imgId={userCtx?.image?.imgId}
                                username={userCtx?.username}
                            />
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
                    getMenuItems(userCtx).map((item, index) =>
                        <MenuItem
                            sx={{
                                p: 0
                            }}
                            key={index}
                        >
                            <Link to={item.url} className='flex gap-2 items-center w-full p-2 px-4'>
                                {item.icon}
                                {item.textChoice}
                            </Link>
                        </MenuItem>
                    )
                }
                {
                    userCtx ?
                    <MenuItem
                        sx={{
                            p: 0
                        }}
                    >
                        <button onClick={() => logOut()} className='flex gap-2 items-center w-full p-2 px-4'>
                            <FontAwesomeIcon icon={faRightFromBracket} style={{ color: APP_PALLETE['main-petrol'], }} />
                            Αποσύνδεση
                        </button>
                    </MenuItem>
                    : null
                }
            </Menu>
        </>
    );
}
