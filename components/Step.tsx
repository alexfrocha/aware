import { ReactNode } from "react";

export default function Step({id, children}: {id: string, children: ReactNode}) {
    return (
        <div id={id} className="absolute w-full top-[50%] left-1/2 opacity-0 transform -translate-x-1/2 -translate-y-[-60%] flex flex-col items-center">        
            {children}
        </div>
    )
}