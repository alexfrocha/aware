import { useEffect } from "react";
import Button from "../Button"
import Title from "../Title"
import gsap from "gsap";
import { animateOut } from "@/app/animation";
import Step from "../Step";

export default function InitStep({nextStep}: {nextStep: () => void}) {

    return (
        <Step id="initstep">        
            <Title>be aware of &#39;em</Title>
            <Button onClick={nextStep}>
                let&#39;s kick it &#127881;
            </Button>
        </Step>
    )
}