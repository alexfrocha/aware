import { ReactNode } from "react";

export default function Container({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={`absolute w-[99%] h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${className}`}>
            {children}
        </div>
    )
}