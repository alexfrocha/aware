'use client'
import Choice from "@/components/voting/Choice";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Card from "@/components/voting/Card";
import { BiLink } from "react-icons/bi";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { VotingProps } from "@/interfaces/VotingProps";
import { randomString } from "@/utils/key";
import Confetti from 'react-confetti'
import Button from "@/components/Button";
import { useWindowSize } from "react-use";
import moment from "moment";
import { formatCreatedAt } from "@/utils/time";
import TimeAgo from "@/components/TimeAgo";
import Link from "next/link";
import { nun } from "@/app/db";
import { ChoiceProps } from "@/interfaces/ChoiceProps";


export default function VotingScreen({id}: {id: string}) {
    const {width, height} = useWindowSize()
    const [selected, setSelected] = useState<string>("")
    const [ipAddress, setIpAddress] = useState<string>("")
    const [blocked, setBlocked] = useState(false)
    const [confetti, setConfetti] = useState(false)
    const [voting, setVoting] = useState<VotingProps>({
        id: randomString(32),
        createdAt: Date.now(),
        title: "which fruit is better?",
        choices: [{
            id: randomString(32),
            value: "apple",
            votes: []
        },{
            id: randomString(32),
            value: "lime",
            votes: []
        },{
            id: randomString(32),
            value: "pineapple",
            votes: []
        },{
            id: randomString(32),
            value: "banana",
            votes: []
        },{
            id: randomString(32),
            value: "strawberry",
            votes: []
        },]
    })
    

    useEffect(() => {

            
        // get the initial data ov voting
        nun.getValue(id).then((value: any) => {
            if(value) {
                setBlocked(false)
                setVoting(value)
            } else {
                setBlocked(true)
            }

            
            // take the user's ip
            fetch("https://api.ipify.org?format=json")
                .then(response => response.json())
                .then(data => {
                    setIpAddress(data.ip)
                    let choice: ChoiceProps = getChoiceVotedByUserFromHisIpAddress(data.ip, value)
                    if(choice) setSelected(choice.id)
                })
                .catch(error => console.log(error))
        })


        // setting up document ids map for easy animation mapping
        let card = {
            self: document.getElementById("card"),
            background: document.getElementById("cardbackground"),
            content: document.getElementById("cardcontent"),
        }

        let tl = gsap.timeline()


        // im newbie with gsap =/
        tl.to(card.self, {
            opacity: 1,
            duration: 1
        }, 0)

        tl.to(card.content, {
            y: "-20%",
            opacity: 1,
            duration: .6,
        }, 0)

        tl.to(card.background, {
            y: "-20%",
            opacity: 1,
            duration: .6,
        }, "-=1")
        
        tl.to(card.content, {
            y: "0",
            opacity: 1,
            duration: 2,
        })
        
        tl.to(card.background, {
            y: "0",
            opacity: 1,
            duration: 2,
        }, "-=2.3")

    }, [])
    
    useEffect(() => {
        console.log(selected)
        if (selected) {
            setConfetti(true)
            setTimeout(() => {
                setConfetti(false)
            }, 6000);
        }
    }, [selected])

    const getAllVotes = () => {
        let totalVotesAsResult = 0;
        voting.choices.forEach(choice => {
            totalVotesAsResult += choice.votes.length
        })
        return totalVotesAsResult
    }

    const getVotesAsPercentage = (choiceVotes: number) => {
        return ((choiceVotes / getAllVotes()) * 100).toFixed(1)
    }

    const checkIfAlreadyVoted = () => {
        let voted = false
        voting.choices.forEach((choice: ChoiceProps) => {
            if(choice.votes.includes(ipAddress)) {
                voted = true
            }
        })
        return voted
    }

    const getChoiceVotedByUserFromHisIpAddress = (ip: string, votingFetch: VotingProps) => {
        let possibleChoiceResult = {} as ChoiceProps;
        votingFetch.choices.forEach((choice: ChoiceProps) => {
            if(choice.votes.includes(ip)) {
                console.log(ip)
                possibleChoiceResult = choice
            }
        })
        return possibleChoiceResult
    }


    // do the ip checker on votes list in choices
    const handleChoose = (choiceId: string) => {
        const choiceIndex = voting.choices.findIndex(choice => choice.id === choiceId);
    
        if (choiceIndex !== -1) {
            if(checkIfAlreadyVoted()) return;
            const updatedChoices = [...voting.choices];
    
            updatedChoices[choiceIndex] = {
                ...updatedChoices[choiceIndex],
                votes: [...updatedChoices[choiceIndex].votes, ipAddress]
            };
    
            setSelected(choiceId);
            setVoting({ ...voting, choices: updatedChoices });
            nun.setValue(id, { ...voting, choices: updatedChoices });
        }
    };

    // watch the data on db for implement the realtime, man nun-db is crazy tbh, nice man
    nun.watch(id,(value: any) => {
        if(value) {
            setBlocked(false)
            console.log(value)
            setVoting(value.value)
        } else {
            setBlocked(true)
        }
    })
    
    return (
        <Container>
            <Link href="/" className="absolute top-[10%] z-[300] left-1/2 -translate-x-1/2 underline underline-offset-8">create a <span>voting</span></Link>
            <Card>
                {blocked ? (
                    <Title>Voting not found &#128533;</Title>
                ) : (
                    <div className="flex flex-col p-3 gap-2">
                        <TimeAgo createdAt={voting.createdAt} />
                        <div className="flex w-full flex-row justify-between items-center">
                            <h2 className="w-[90%]">{voting.title}</h2>
                            <button className="p-3 rounded-[3px] duration-200 cursor-pointer hover:bg-zinc-800">
                                <BiLink />
                            </button>
                        </div>

                        <div className="flex flex-row justify-between">
                            <p className="text-zinc-500 text-[13px]">{getAllVotes()} {getAllVotes() != 1 ? "votes" : "vote"}</p>
                        </div>
                        <div className="flex flex-col gap-1 p-2 border border-zinc-200/20 h-full">
                            {voting.choices.map(choice => (
                                <Choice percent={selected && getVotesAsPercentage(choice.votes.length)} onClick={() => {handleChoose(choice.id)}} selected={choice.id == selected} key={choice.id}>
                                    {choice.value}
                                </Choice>
                            ))}
                        </div>

                    </div>
                )}
            </Card>
            {confetti && <Confetti className="absolute" numberOfPieces={20} tweenDuration={5}  width={width} height={height} />}
        </Container>
    )
}