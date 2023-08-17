import { useContext, useState } from "react"
import { AppContext, closeModal, openModal } from "../AppContext"

export function Footer() {

    const [count, setCount] = useState(0);

    const ctx = useContext(AppContext);

    const openModalWrapper = () => {
        openModal(ctx, {
            content: () => (
                <div className="flex flex-col justify-between w-full flex-1">
                    <span>Hello World!</span>
                    <div className="flex justify-between">
                        <button
                            onClick={() => setCount(count + 1)}
                            className="rounded-lg bg-main-petrol hover:bg-dark-petrol text-white duration-300 py-1 px-3"
                        >
                            Count: {count}
                        </button>
                        <button
                            onClick={() => closeModal(ctx)}
                            className="rounded-lg bg-main-petrol hover:bg-dark-petrol text-white duration-300 py-1 px-3"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )
        })
    }

    return (
        <footer className="bg-main-petrol w-full py-2 mt-auto">
            {/* Footer */}
            {
                <button onClick={openModalWrapper}>Open Modal {count}</button>
            }
        </footer>
    )
}
