import { ReactNode } from "react";

export default function Title({children}: {children: ReactNode}) {
    return (
        <h1 className="font-bold text-center text-[30px] md:text-[62px]">{children}</h1>
    )
}