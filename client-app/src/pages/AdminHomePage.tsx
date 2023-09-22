import { useContext } from "react";
import { AppContext } from "../AppContext";
import { RoleType } from "../api/entities/RoleType";
import { NotFoundPage } from "./NotFoundPage";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAddressCard, faMagnifyingGlass, faUserCheck, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { ORDERED_BASE_ROLE_PATHS } from "./pathConstants";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const homePageOptions: {
    label: string,
    icon: IconProp,
    url: string,
}[] = [
    {
        icon: faMagnifyingGlass,
        label: 'Αναζήτηση Χρηστών',
        url: `${ORDERED_BASE_ROLE_PATHS.ADMIN}/searchUsers`
    },
    {
        icon: faUserCheck,
        label: 'Ενεργοποίηση Χρηστών',
        url: `${ORDERED_BASE_ROLE_PATHS.ADMIN}/searchUsers?isActive=false`
    },
    {
        icon: faUserSlash,
        label: 'Απενεργοποίηση Χρηστών',
        url: `${ORDERED_BASE_ROLE_PATHS.ADMIN}/searchUsers?isActive=true`
    },
    {
        icon: faAddressCard,
        label: 'Διαχείριση Προφίλ',
        url: `${ORDERED_BASE_ROLE_PATHS.ADMIN}/profile`
    },
];

export function AdminHomePage() {
    const userCtx = useContext(AppContext).state.businessContext.userContext;
    return (
        userCtx?.roles.includes(RoleType.ADMIN) ?
        <div className="flex w-2/3 justify-center items-start">
            <div className="w-full grid grid-rows-2 grid-cols-2 gap-3">
            {
                homePageOptions.map((opt, i) => (
                    <Link key={i} to={opt.url}>
                        <button 
                            className="
                                w-full
                                flex flex-col items-center justify-center gap-4
                                col-span-1 row-span-1
                                bg-main-petrol hover:bg-dark-petrol duration-200 text-white
                                rounded-xl py-10 px-5
                            "
                        >
                            <FontAwesomeIcon size="6x" icon={opt.icon}/>
                            <span className="text-2xl font-light">{opt.label}</span>
                        </button>
                    </Link>
                ))
            }
            </div>
        </div>
        :
        <NotFoundPage/>
    );
}
