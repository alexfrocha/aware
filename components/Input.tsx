export default function Input(props: any) {
    return (
        <input autoFocus spellCheck={false} className={`bg-zinc-800/30 border w-full border-zinc-200/20 text-[13px] outline-none px-5 min-h-[30px] py-2 rounded-[3px]`} {...props} />
    )
}