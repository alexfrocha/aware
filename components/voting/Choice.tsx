import { ReactNode } from "react";

export default function Choice(props: any) {
    return (
        <button className={` duration-200 px-3 py-2 text-start h-[40px] rounded-[2px] w-full ${props.selected ? "bg-purple-500" : "bg-zinc-800/30"}`} {...props}>
            <div className="flex flex-row justify-between items-center w-full">
                <span>{props.children}</span>
                {props.percent && (
                    <span className="text-[14px]">{props.percent}%</span>
                )}
            </div>
        </button>
    )
}