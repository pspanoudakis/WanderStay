import { createContext } from 'react'
import { dateToStr } from './api/entities/dates'
import { UserResponse } from './api/responses/UserResponse'

export type UserContext = UserResponse['user'];

export type SearchContext = {
    countryId: number | null,
    cityId: number | null,
    dateFrom: string | null,
    dateTo: string | null,
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
//                 image: ImageEntity | null,
//                 roles: RoleType[],
//                 email: string,
//                 firstName: string,
//                 lastName: string,
//                 mobileNumber: string,
//                 accountNonLocked: boolean,
//                 accountNonExpired: boolean,
//                 credentialsNonExpired: boolean,
//                 active: boolean,
//                 locked: boolean,
//                 enabled: boolean,
//             },
//             searchContext: {
//                 countryId: number | null,
//                 cityId: number | null,
//                 dateFrom: string | null,
//                 dateTo: string | null,
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
            countryId: null,
            cityId: null,
            dateFrom: dateToStr(new Date()),
            dateTo: null,
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
export function clearUserContext(currentCtx: AppContextType) {
    currentCtx.setState?.({
        ...currentCtx.state,
        businessContext: {
            ...currentCtx.state.businessContext,
            userContext: undefined
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
