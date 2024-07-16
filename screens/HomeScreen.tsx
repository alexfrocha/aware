'use client'

import { animateIn, animateOut } from "@/app/animation";
import Button from "@/components/Button";
import Container from "@/components/Container";
import ChoicesStep from "@/components/form/ChoicesStep";
import FinishStep from "@/components/form/FinishStep";
import InitStep from "@/components/form/InitStep";
import TitleStep from "@/components/form/TitleStep";
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [step, setStep] = useState<string>("init");

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

    function nextStep() {
        switch (step) {
            case "init":
                setStep("title");
                break;
            case "title":
                console.log("[DEBUG] chamado dentro do nextstep")
                setStep("choices");
                break;
            case "choices":
                setStep("finish");
                break;
            default:
                break;
        }
        
    }


    return (
        <Container>
            <InitStep nextStep={nextStep} />
            <TitleStep nextStep={nextStep} />
            <ChoicesStep nextStep={nextStep} />
            <FinishStep nextStep={nextStep} />
        </Container>
    )
}