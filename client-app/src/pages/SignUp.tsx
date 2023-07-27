import { useState } from "react";

interface SignUpFormState {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    pwd: string,
    confirmPwd: string,
}

export function SignUp() {

    const [userInfo, setUserInfo] = useState<SignUpFormState>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        pwd: "",
        confirmPwd: "",
    })

    function saveUserInfo(valueTitle: keyof SignUpFormState, value: string) {
        switch (valueTitle) {
            case "firstName":
                setUserInfo({
                    ...userInfo,
                    firstName: value
                })
                break;
            case "lastName":
                setUserInfo({
                    ...userInfo,
                    lastName: value
                })
                break;
            case "email":
                setUserInfo({
                    ...userInfo,
                    email: value
                })
                break;
            case "phone":
                setUserInfo({
                    ...userInfo,
                    phone: value
                })
                break;
            case "pwd":
                setUserInfo({
                    ...userInfo,
                    pwd: value
                })
                break;
            case "confirmPwd":
                setUserInfo({
                    ...userInfo,
                    confirmPwd: value
                })
                break;
        }
    }

    return (
        <form className="flex flex-col border-2 border-gray-300 h-2/3 w-2/5 rounded-3xl items-center gap-y-5">
            <b><h1 className="text-dark-petrol text-3xl mt-4">Εγγραφή</h1></b>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Όνομα</h2>
                    <input
                        type="text" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.firstName} onChange={(e) => saveUserInfo("firstName", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επώνυμο</h2>
                    <input
                        type="text"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.lastName} onChange={(e) => saveUserInfo("lastName", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Διεύθυνση email</h2>
                    <input
                        type="email"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.email} onChange={(e) => saveUserInfo("email", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κινητό</h2>
                    <input
                        type="text"
                        className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.phone} onChange={(e) => saveUserInfo("phone", e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Κωδικός</h2>
                    <input
                        type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.pwd} onChange={(e) => saveUserInfo("pwd", e.target.value)}
                    />
                </div>
                <div className="flex flex-col items-start">
                    <h2 className="text-dark-petrol text-lg mt-4">Επιβεβαίωση Κωδικού</h2>
                    <input
                        type="password" className="bg-white border-2 border-gray-300 rounded-full h-10 text-black w-60 px-3"
                        value={userInfo.confirmPwd} onChange={(e) => saveUserInfo("confirmPwd", e.target.value)}
                    />
                </div>
            </div>
            <button type="submit" className="text-lg w-60 bg-white border-2 border-dark-petrol text-dark-petrol rounded-3xl hover:border-white hover:bg-dark-petrol hover:text-white">
                ΕΓΓΡΑΦΕΙΤΕ
            </button>
        </form>
    )
}
