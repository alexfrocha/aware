import Button from "../Button";
import Step from "../Step";
import Title from "../Title";

export default function TitleStep({nextStep}: {nextStep: () => void}) {

    return (
        <Step id="titlestep">        
            <Title>how we gon call it?</Title>
            <Button onClick={nextStep}>
                that&#39;s good &#128077;
            </Button>
        </Step>
    )
}