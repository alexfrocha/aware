import Button from "../Button";
import Step from "../Step";
import Title from "../Title";

export default function ChoicesStep({nextStep}: {nextStep: () => void}) {

    return (
        <Step id="choicesstep">        
            <Title>do u like apple or lime?</Title>
            <Button onClick={nextStep}>
                nice choice &#128640;
            </Button>
        </Step>
    )
}