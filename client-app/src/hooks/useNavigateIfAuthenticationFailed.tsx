import { useNavigate } from "react-router-dom";
import { FetchDataResponse } from "../api/fetchRoutines/fetchAPI";
import { useContext } from "react";
import { AppContext } from "../AppContext";
import { ModalActionResultTemplate } from "../components/ModalActionResultTemplate";

export function useNavigateIfAuthenticationFailed() {
    const navigate = useNavigate();
    const ctx = useContext(AppContext);

    return (response: FetchDataResponse<unknown>) => {
        if (response.statusCode === 403) {
            ctx.setState?.({
                businessContext: {
                    ...ctx.state.businessContext,
                    userContext: undefined
                },
                modalContext: {
                    showModal: true,
                    modalProps: {
                        content: () => (
                            <ModalActionResultTemplate
                                success={false}
                                errorText="Για να συνεχίσετε, πρέπει να συνδεθείτε."
                            />
                        )
                    }
                }
            });
            navigate('/signIn', { replace: false });
            return true;
        }
        return false;
    };
}
