import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket, faCircleUser, faBars } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";
import { PopOverMenu } from "./PopOverMenu";

export function NavBar() {
    return (<nav className="bg-white w-full border-b-2 border-light-petrol flex-col text-main-petrol">
        <div className="flex justify-between p-2 items-center px-8">
            <Link to="/" className="text-main-petrol font-bold text-2xl hover:text-main-petrol">WanderStay</Link>
            {/* <button className="rounded-full bg-white border-2 border-main-petrol hover:bg-main-petrol hover:text-white hover:border-2">
                <div className="flex gap-2">
                    <FontAwesomeIcon icon={faBars} />
                    <FontAwesomeIcon icon={faCircleUser} />
                </div>
            </button> */}
            <PopOverMenu/>

        </div>
        <div>
            searchbar
        </div>
    </nav>);
}