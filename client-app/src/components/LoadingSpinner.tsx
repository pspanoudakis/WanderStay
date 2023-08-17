import { CircularProgress } from "@mui/material"

export function LoadingSpinner({text, coverParent, customTwBgColor}: {
    text?: string,
    coverParent?: boolean,
    customTwBgColor?: string
}) {
    
    return (
        <div
            className={`
                flex flex-col gap-3 justify-center items-center text-lg z-10
                ${
                    coverParent ? 
                    `absolute top-0 right-0 w-full h-full ${customTwBgColor ?? 'bg-white/80'}` 
                    : 'p-3'
                }
            `}
        >
            <CircularProgress
                size="4rem"
            />
            <span className="font-normal">
            {
                text ?? 'Φόρτωση...'
            }
            </span>
        </div>
    )
}
