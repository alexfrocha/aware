import { ReactNode } from "react";

export default function Title({children}: {children: ReactNode}) {
    return (
        <h1 className="font-bold pointer-events-none text-center text-[28px] md:text-[62px]">{children}</h1>
    )
}