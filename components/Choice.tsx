import { ReactNode } from "react";

export default function Choice(props: any) {
    return (
        <button className="bg-zinc-800/30 px-3 py-2 text-start h-[40px] rounded-[2px] w-full md:w-[40%]" {...props}>
            {props.children}
        </button>
    )
}