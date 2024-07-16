import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import Step from "../Step";
import Title from "../Title";

export default function TitleStep({nextStep, title, setTitle}: {nextStep: () => void, title: string, setTitle: React.Dispatch<React.SetStateAction<string>>}) {
    const [missingTitle, setMissingTitle] = useState(false)

    const handleNext = () => {
        setMissingTitle(false)
        if(!title) return setMissingTitle(true);
        nextStep()
    }


    return (
        <Step id="titlestep" className="z-[9]">        
            <Title>how we gon call it?</Title>
            <Input value={title} onChange={(e: any) => setTitle(e.target.value)} id="titleinput" className={`w-[80%] pb-3 md:pb-0 duration-300 text-center mb-2 md:w-[40%] md:text-[42px] border-b bg-none outline-none bg-black ${!title && missingTitle ? "border-b-red-500" : "border-b-zinc-300"}`} />
            <Button onClick={handleNext}>
                that&#39;s good &#128077;
            </Button>
        </Step>
    )
}