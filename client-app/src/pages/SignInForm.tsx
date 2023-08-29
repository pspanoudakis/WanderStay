import { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/PrimaryButton";
import { loginWithCredentials } from "../api/fetchRoutines/authAPI";
import { AppContext } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { getBaseNavigationPath } from "../components/utils/getBaseNavigationPath";

export function SignInForm() {

    const ctx = useContext(AppContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [isVisible, setVisible] = useState(false)
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');

    const submitRequest = () => {
        setLoading(true);

        loginWithCredentials({
            username,
            password: pwd,
        }).then(response => {

            setLoading(false);
            ctx.setState?.({
                businessContext: {
                    ...ctx.state.businessContext,
                    userContext: response.ok ? response.content.user : undefined
                },
                modalContext: {
                    showModal: !response.ok,
                    modalProps: {
                        content:(
                            !response.ok ?
                            () => (
                                <ModalActionResultTemplate
                                    success={false}
                                    errorText="Σφάλμα κατά τη σύνδεση."
                                />
                            )
                            : undefined
                        )
                    }
                }
            })
            if (response.ok) {
                navigate(getBaseNavigationPath(response.content.user.roles));
            }
        });
    }
    
    return (
        <div className="flex flex-col border-2 border-gray-300 h-2/3 w-1/3 rounded-3xl items-center gap-y-10 relative">
            <LoadingSpinner
                coverParent={true}
                text="Σύνδεση..."
                visible={loading}
            />
            <b><h1 className="text-dark-petrol text-3xl mt-4">Σύνδεση</h1></b>
            <div className="flex flex-col items-start w-80">
                <h2 className="text-dark-petrol text-lg mt-4">Όνομα Χρήστη</h2>
                <input
                    type="email" className="outline-none bg-white border-2 border-gray-300 rounded-full h-10 text-black w-80 px-3"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="flex flex-col items-start">
                <h2 className="text-dark-petrol text-lg mt-4">Κωδικός</h2>
                <div className="flex bg-white border-2 border-gray-300 rounded-full h-10 justify-between items-center w-80">
                    <input
                        type={isVisible ? "text" : "password"}
                        className="bg-white outline-none text-black rounded-full w-4/5 px-3"
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                    <button className="bg-white rounded-full w-1/5 text-lg p-0" onClick={() => setVisible(!isVisible)}>
                        <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} size='lg' className="text-dark-petrol mr-4" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <i><a href="/">Ξεχάσατε τον κωδικό σας;</a></i>
                <p className="text-black">
                    Δεν έχετε λογαριασμό; <Link to="/signUp" className="text-dark-petrol">Εγγραφείτε εδώ</Link>
                </p>
            </div>
            <PrimaryButton
                onClick={() => submitRequest()}
                disabled={false}
                classExtras="text-xl rounded-full px-6 py-1"
            >
                Σύνδεση
            </PrimaryButton>
        </div>
    )
}
