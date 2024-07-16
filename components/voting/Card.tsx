import { ReactNode } from "react";
import Title from "../Title";

export default function Card({children}: {children: ReactNode}) {
    return (
        <div id="card" className="relative opacity-0 w-full h-full">
            <div id="cardbackground" className="absolute p-3 z-[9] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] min-h-[40%] md:w-[60%] md:min-w-[500px] md:min-h-[400px] bg-purple-500 m-3"></div>
            <div id="cardcontent" className="absolute p-3 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[90%] min-h-[40%] md:w-[60%] md:min-w-[500px] md:min-h-[400px] bg-[#060606] border border-zinc-200/20">
                {children}
            </div>
        </div>
    )
}