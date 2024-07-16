import Button from "../Button";
import Step from "../Step";
import Title from "../Title";

export default function FinishStep({nextStep}: {nextStep: () => void}) {

    return (
        <Step id="finishstep">        
            <Title>sure?</Title>
            <Button onClick={nextStep}>
                ok, let&#39;s do it &#128640;
            </Button>
        </Step>
    )
}