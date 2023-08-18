import { useContext } from "react";
import { AppContext, closeModal } from "../AppContext";
import { Modal as MuiModal} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export function Modal() {

    const ctx = useContext(AppContext);
    const {modalProps, showModal} = ctx.state.modalContext;
    
    return (
        <MuiModal
            open={showModal}
            sx={{
                paddingTop: '5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start'
            }}
        >
        <div
            className="
                flex flex-col justify-start items-center 
                py-3 px-4 rounded-lg bg-white
                max-w-2xl
            "
            style={{
                minWidth: '20rem',
                minHeight: '10rem',
            }}
        >
            <div className="w-full flex flex-row justify-end items-center">
                <button
                    onClick={() => closeModal(ctx)}
                    className="text-main-petrol duration-300 hover:text-dark-petrol"
                >
                    <FontAwesomeIcon icon={faXmarkCircle} size="2xl"></FontAwesomeIcon>                    
                </button>
            </div>
            {
                modalProps.content?.()
            }  
        </div>        
        </MuiModal>
    );
}
