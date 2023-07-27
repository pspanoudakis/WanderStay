import { createContext } from 'react'

// TODO: fix me (maybe?)
type UserContext = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string
}

type ModalProps = {
    content?: () => JSX.Element,
    classNameExtras?: string
}

type ModalContext = {
    showModal: boolean,
    modalProps: ModalProps
}

type AppContextState = {
    userContext?: UserContext,
    modalContext: ModalContext
}

// Use this as a cheatsheet
//
// type AppContextType = {
//     state: {
//         userContext?: {
//             username: string,
//             firstName: string,
//             lastName: string,
//             email: string,
//             mobileNumber: string
//         },
//         modalContext: {
//             showModal: boolean,
//             modalProps: {
//                 content?: () => JSX.Element,
//                 classNameExtras?: string
//             }
//         }
//     }
//     setState: ((newState: AppContextState) => void) | undefined
// }

export type AppContextType = {
    state: AppContextState,
    setState: ((newState: AppContextState) => void) | undefined
}

export const AppContextInitValue: AppContextType = {
    state: {
        userContext: undefined,
        modalContext: {
            showModal: false,
            modalProps: {}
        }
    },
    setState: undefined
}

export const AppContext = createContext<AppContextType>(AppContextInitValue);

export function setUserContext(currentCtx: AppContextType, newUserCtx: UserContext) {
    currentCtx.setState?.({
        ...currentCtx.state,
        userContext: newUserCtx
    });
}

export function openModal(currentCtx: AppContextType, modalProps: ModalProps) {
    currentCtx.setState?.({
        ...currentCtx.state,
        modalContext: {
            showModal: true,
            modalProps: modalProps
        }
    });
}

export function closeModal(currentCtx: AppContextType) {
    currentCtx.setState?.({
        ...currentCtx.state,
        modalContext: {
            showModal: false,
            modalProps: {}
        }
    });
}
