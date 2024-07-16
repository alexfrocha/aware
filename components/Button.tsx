import { ReactNode } from "react";

export default function Button({children, onClick}: {children: ReactNode, onClick?: () => void}) {
    return (
        <button onClick={() => {
            if (onClick) onClick()
        }} className="px-4 py-2 md:mt-0 mt-3 duration-200 text-[10px] md:text-[13px] hover:bg-white hover:text-black border border-white rounded-[5px] w-fit">{children}</button>
    )
}