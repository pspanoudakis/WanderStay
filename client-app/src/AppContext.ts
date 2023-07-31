import { createContext } from 'react'
import { LocationEntity } from './api/entities/LocationEntity'
import { RoleType } from './api/entities/RoleType'

// TODO: fix me (maybe?)
type UserContext = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    roles: RoleType[]
}

export type SearchContext = {
    country?: LocationEntity,
    city?: LocationEntity,
    dateFrom?: Date | null,
    dateTo?: Date | null,
    numPersons: number
}

type ModalProps = {
    content?: () => JSX.Element,
    classNameExtras?: string
}

type ModalContext = {
    showModal: boolean,
    modalProps: ModalProps
}

export type AppContextState = {
    businessContext: {
        userContext?: UserContext,
        searchContext: SearchContext
    }
    modalContext: ModalContext
}

// Use this as a cheatsheet

// type AppContextType = {
//     state: {
//         businessContext: {
//             userContext?: {
//                 username: string,
//                 firstName: string,
//                 lastName: string,
//                 email: string,
//                 mobileNumber: string
//             },
//             searchContext: {
//                 location?: {
//                     id: number,
//                     name: string
//                 },
//                 dayFrom?: Date,
//                 dayTo?: Date,
//                 numPersons: number
//             }
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
    setState?: ((newState: AppContextState) => void)
}

export const appContextInitState: AppContextState = {
    businessContext: {
        userContext: undefined,
        searchContext: {
            country: undefined,
            city: undefined,
            dateFrom: new Date(),
            dateTo: undefined,
            numPersons: 1
        }
    },
    modalContext: {
        showModal: false,
        modalProps: {}
    }
}

export const AppContext = createContext<AppContextType>({
    state: appContextInitState,
    setState: undefined
});

export function setUserContext(currentCtx: AppContextType, newUserCtx: UserContext) {
    currentCtx.setState?.({
        ...currentCtx.state,
        businessContext: {
            ...currentCtx.state.businessContext,
            userContext: newUserCtx
        }
    });
}

export function setSearchContext(currentCtx: AppContextType, newSearchCtx: SearchContext) {
    currentCtx.setState?.({
        ...currentCtx.state,
        businessContext: {
            ...currentCtx.state.businessContext,
            searchContext: newSearchCtx
        }
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
