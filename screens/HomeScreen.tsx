'use client'

import { animateIn, animateOut } from "@/app/animation";
import Container from "@/components/Container";
import ChoicesStep from "@/components/form/ChoicesStep";
import FinishStep from "@/components/form/FinishStep";
import InitStep from "@/components/form/InitStep";
import TitleStep from "@/components/form/TitleStep";
import { ChoiceProps } from "@/interfaces/ChoiceProps";
import { randomString } from "@/utils/key";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [step, setStep] = useState<string>("init");
    const [title, setTitle] = useState<string>("")
    const [choices, setChoices] = useState<ChoiceProps[]>([
        {
            id: randomString(32),
            value: "",
            votes: 0
        }
    ])

    useEffect(() => {
        let steps = {
            actual: document.querySelector("nada"),
            init: document.querySelector("#initstep"),
            title: document.querySelector("#titlestep"),
            choices: document.querySelector("#choicesstep"),
            finish: document.querySelector("#finishstep")
        }
        
        switch (step) {
            case "init":
                animateIn(steps.init, 2)
                break;
            case "title":
                console.log("[DEBUG] chamado dentro do useEffect")
                animateOut(steps.init, 2)
                animateIn(steps.title, 2)
                break;
            case "choices":
                animateOut(steps.title, 2)
                animateIn(steps.choices, 2)
                break;
            case "finish":
                animateOut(steps.choices, 2)
                animateIn(steps.finish, 2)
                break;
            default:
                animateOut(steps.actual, 2)
                break;
        }

    }, [step])

    const router = useRouter()

    function nextStep() {
        switch (step) {
            case "init":
                setStep("title");
                document.getElementById("titleinput")?.focus()
                break;
            case "title":
                setStep("choices");
                break;
            case "choices":
                setStep("finish");
                break;
            default:
                break;
        }
    }

    function handleFinishAndCreateVoting() {
        let newVoting = {
            id: randomString(32),
            title,
            choices
        }
        router.push(`/voting/${newVoting.id}`)
    }

    return (
        <Container>
            <InitStep nextStep={nextStep} />
            <TitleStep title={title} setTitle={setTitle} nextStep={nextStep} />
            <ChoicesStep choices={choices} setChoices={setChoices} nextStep={nextStep} />
            <FinishStep handleFinishAndCreateVoting={handleFinishAndCreateVoting} />
        </Container>
    )
}