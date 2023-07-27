import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

export function SignUp(){

    const[userInfo, setUserInfo] = useState({
        firstName: "",
        lastName : "",
        email: "",
        phone: "",
        pswd: ""
    })

    function saveUserInfo(valueTitle: string, value:string){
        switch(valueTitle){
            case "firstname":
                setUserInfo({
                    ...userInfo,
                    firstName : value
                })
            break;
            case "lastname":
                setUserInfo({
                    ...userInfo,
                    firstName : value
                })
            break;
            case "email":
                setUserInfo({
                    ...userInfo,
                    firstName : value
                })
            break;
            case "phone":
                setUserInfo({
                    ...userInfo,
                    firstName : value
                })
            break;
            case "pswd":
                setUserInfo({
                    ...userInfo,
                    firstName : value
                })
            break;
        }
    }

    return(
        <form className="flex flex-col border-2 border-gray-300 h-2/3 w-2/5 rounded-3xl items-center gap-y-5">
            <b><h1 className="text-dark-petrol text-3xl mt-4">Εγγραφή</h1></b>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Όνομα</h2>
                    <input type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60" onChange={(e) => saveUserInfo("firstname", e.target.value)}/>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επώνυμο</h2>
                    <input type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60" onChange={(e) => saveUserInfo("lastname", e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Διεύθυνση email</h2>
                    <input type="email" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60" onChange={(e) => saveUserInfo("email", e.target.value)}/>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κινητό</h2>
                    <input type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60" onChange={(e) => saveUserInfo("phone", e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κωδικός</h2>
                    <input type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60" onChange={(e) => saveUserInfo("pswd", e.target.value)}/>
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επιβεβαίωση Κωδικού</h2>
                    <input type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60"/>
                </div>
            </div>
            <button type="submit" className="text-lg w-60 bg-white border-2 border-dark-petrol text-dark-petrol rounded-3xl hover:border-white hover:bg-dark-petrol hover:text-white">
                ΕΓΓΡΑΦΕΙΤΕ
            </button>
        </form>
    )
}