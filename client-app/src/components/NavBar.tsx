import { Link } from "react-router-dom";
import { PopOverMenu } from "./PopOverMenu";
import { SearchBar } from "./SearchBar";

export function NavBar() {
    return (<nav className="bg-white w-full flex-col text-main-petrol">
        <div className="flex justify-between p-2 items-center px-8  border-b-2 border-light-petrol">
            <Link
                to="/" 
                className="text-main-petrol font-bold text-2xl hover:text-main-petrol"
                style={{
                    fontFamily: 'Pacifico'
                }}
            >
                    WanderStay
            </Link>
            <PopOverMenu/>

        </div>
        <div className="w-full relative mb-8">
            <SearchBar/>
        </div>
    </nav>);
}
