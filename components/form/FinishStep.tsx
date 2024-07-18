import Button from "../Button";
import Step from "../Step";
import Title from "../Title";

export default function FinishStep({handleFinishAndCreateVoting}: {handleFinishAndCreateVoting: () => void}) {
    return (
        <Step id="finishstep" className="z-[7]">        
            <Title>sure?</Title>
            <Button onClick={handleFinishAndCreateVoting}>
                ok, let&#39;s do it &#128640;
            </Button>
        </Step>
    )
}