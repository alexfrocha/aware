import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "../Button";
import Input from "../Input";
import Step from "../Step";
import Title from "../Title";
import { ChoiceProps } from "@/interfaces/ChoiceProps";
import { randomString } from "@/utils/key";
import { useState } from "react";

const styles = {
    inputBaseClassname: "bg-zinc-800/30 border w-full text-[13px] outline-none px-5 min-h-[30px] py-2 rounded-[3px]"
}

export default function ChoicesStep({nextStep, choices, setChoices}: {nextStep: () => void, choices: ChoiceProps[], setChoices: React.Dispatch<React.SetStateAction<ChoiceProps[]>>}) {
    
    const [missingValue, setMissingValue] = useState(false)

    const setValueOfChoiceById = (choiceId: string, newValue: string) => {
        setChoices(prevChoices =>
            prevChoices.map(choice =>
                choice.id === choiceId ? { ...choice, value: newValue } : choice
            )
        );
    }

    const haveAnyChoicesValueEmpty = () => {
        let emptyChoices = choices.filter(choice => !choice.value)
        return emptyChoices.length > 0;
    }

    const handleCreateNewChoice = () => {
        let newChoiceData: ChoiceProps = {
            id: randomString(32),
            value: "",
            votes: []
        }
        if(choices.length < 5) setChoices([...choices, newChoiceData])
    }

    const handleRemoveThisChoiceById = (choiceId: string) => {
        setChoices([...choices.filter(choice => choice.id != choiceId)])
    }

    const handleNext = () => {
        setMissingValue(false)
        if(choices.length < 2) {
            return handleCreateNewChoice()
        }
        if(haveAnyChoicesValueEmpty()) {
            setMissingValue(true)
            return console.log("tem alguma choice vazia")
        }
        nextStep()
    }
    
    return (
        <Step id="choicesstep" className="z-[8]">        
            <Title>do u like apple or lime?</Title>
            <div className="flex w-[80%] md:w-[40%] items-center justify flex-col gap-2">
                {choices.map(choice => (
                    <div key={choice.id} className="flex w-full gap-1 flex-row justify-between ">
                        <Input className={`${styles.inputBaseClassname} ${!choice.value && missingValue ? "border-red-500" : "border-zinc-200/20"} duration-200`} onChange={(e: any) => {setValueOfChoiceById(choice.id, e.target.value)}} value={choice.value} placeholder="some option who anyone fw"  />
                        <button onClick={() => {handleRemoveThisChoiceById(choice.id)}} className="px-3 py-2 bg-red-500 rounded-[2px] duration-200 hover:opacity-40 cursor-pointer">
                            <RiDeleteBin6Fill />
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex gap-2">
                <Button onClick={handleCreateNewChoice}>
                    greedy &#128520;
                </Button>
                <Button onClick={handleNext}>
                    i&#39;m fine now &#128640;
                </Button>
            </div>
        </Step>
    )
}