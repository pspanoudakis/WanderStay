import { Link, Location } from "react-router-dom";
import { PopOverMenu } from "./PopOverMenu";
import { SearchBar } from "./SearchBar";
import { ORDERED_BASE_ROLE_PATHS } from "../pages/pathConstants";

export function NavBar({location}:{
    location: Location
}) {

    const baseHomePath = Object.values(ORDERED_BASE_ROLE_PATHS).find(
        path => location.pathname.startsWith(path)
    ) ?? ORDERED_BASE_ROLE_PATHS.GUEST;

    const showSearchBar = baseHomePath === ORDERED_BASE_ROLE_PATHS.GUEST;

    return (
        <nav className="bg-white w-full flex-col text-main-petrol sticky top-0 z-50">
            <div className="flex justify-between p-2 items-center px-8  border-b-2 border-light-petrol">
                {
                    showSearchBar ?
                    <>
                    <Link
                        to={baseHomePath}
                        className="text-main-petrol font-bold text-3xl duration-300 hover:text-dark-petrol"
                        style={{
                            fontFamily: 'Pacifico'
                        }}
                    >
                        WanderStay
                    </Link>
                    <PopOverMenu/>
                    </>
                    :
                    <div className="w-screen flex justify-end items-center">
                        <div className="w-1/2 flex justify-end items-center">
                            <Link
                                to={baseHomePath}
                                className="
                                    text-main-petrol font-bold text-4xl 
                                    duration-300 hover:text-dark-petrol
                                    py-3 absolute
                                "
                                style={{
                                    fontFamily: 'Pacifico',
                                    left: 'max(47rem, 44%)'
                                    // left: '47rem'
                                }}
                            >
                                WanderStay
                            </Link>
                            <PopOverMenu/>
                        </div>
                    </div>
                }

            </div>
            {
                showSearchBar ?
                <div className="w-full relative mb-8">
                    <SearchBar/>
                </div>
                :
                null
            }
        </nav>
    );
}
