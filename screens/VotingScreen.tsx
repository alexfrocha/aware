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
import Button from "@/components/Button";

export default function VotingScreen() {
    const [selected, setSelected] = useState<string>("")
    const [voting, setVoting] = useState<VotingProps>({
        id: randomString(32),
        title: "which fruit is better?",
        choices: [{
            id: randomString(32),
            value: "apple",
            votes: 12
        },{
            id: randomString(32),
            value: "lime",
            votes: 42
        },{
            id: randomString(32),
            value: "pineapple",
            votes: 5
        },{
            id: randomString(32),
            value: "banana",
            votes: 5
        },{
            id: randomString(32),
            value: "strawberry",
            votes: 5
        },]
    })

    useEffect(() => {

        let card = {
            self: document.getElementById("card"),
            background: document.getElementById("cardbackground"),
            content: document.getElementById("cardcontent"),
        }

        let tl = gsap.timeline()

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

    const getAllVotes = () => {
        let totalVotesAsResult = 0;
        voting.choices.forEach(choice => {
            totalVotesAsResult += choice.votes
        })
        return totalVotesAsResult
    }

    const getVotesAsPercentage = (choiceVotes: number) => {
        return ((choiceVotes / getAllVotes()) * 100).toFixed(1)
    }


    return (
        <Container className="">
            <Card>
                <div className="flex flex-col p-3 gap-2">
                    <p className="text-zinc-500 text-[13px] -mb-3">created 3 sec ago</p>
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
                            <Choice percent={selected && getVotesAsPercentage(choice.votes)} onClick={() => setSelected(choice.id)} selected={choice.id == selected} key={choice.id}>
                                {choice.value}
                            </Choice>
                        ))}
                    </div>
                </div>
            </Card>
        </Container>
    )
}