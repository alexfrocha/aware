"use client";
import Choice from "@/components/voting/Choice";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Card from "@/components/voting/Card";
import { BiLink } from "react-icons/bi";
import { useEffect, useState } from "react";
import { VotingProps } from "@/interfaces/VotingProps";
import { randomString } from "@/utils/key";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import TimeAgo from "@/components/TimeAgo";
import Link from "next/link";
import { nun } from "@/app/db";
import { ChoiceProps } from "@/interfaces/ChoiceProps";
import {
    animateInCopyURLNotification,
    animateOutCopyURLNotification,
    animateVotingScreenCard,
} from "@/app/animation";
import { Console } from "console";

export default function VotingScreen({ id }: { id: string }) {
    const { width, height } = useWindowSize();
    const [selected, setSelected] = useState<string>("");
    const [ipAddress, setIpAddress] = useState<string>("");
    const [blocked, setBlocked] = useState(false);

    const [confetti, setConfetti] = useState(false);
    const [copied, setCopied] = useState(false);
    const [voting, setVoting] = useState<VotingProps>({
        id: randomString(32),
        createdAt: Date.now(),
        title: "which fruit is better?",
        choices: [
            {
                id: randomString(32),
                value: "apple",
                votes: [],
            },
            {
                id: randomString(32),
                value: "lime",
                votes: [],
            },
            {
                id: randomString(32),
                value: "pineapple",
                votes: [],
            },
            {
                id: randomString(32),
                value: "banana",
                votes: [],
            },
            {
                id: randomString(32),
                value: "strawberry",
                votes: [],
            },
        ],
    });

    useEffect(() => {
        // get the initial data ov voting
        nun.getValue(id).then((value: any) => {
            if (value) {
                setBlocked(false);

                // take the user's ip and already verifies if he alr voted
                fetch("https://api.ipify.org?format=json")
                    .then((response) => response.json())
                    .then((data) => {
                        setIpAddress(data.ip);
                        // check if the user already voted and
                        let choice: ChoiceProps = getChoiceVotedByUserFromHisIpAddress(
                            data.ip,
                            value,
                        );
                        if (choice) setSelected(choice.id);
                    })
                    .catch((error) => console.log(error));

                setVoting(value);
            } else {
                setBlocked(true);
            }
        });

        // setting up document ids map for easy animation mapping
        animateVotingScreenCard();
    }, []);

    useEffect(() => {
        if (selected) {
            setConfetti(true);
            setTimeout(() => {
                setConfetti(false);
            }, 6000);
        }
    }, [selected]);

    const getAllVotes = () => {
        let totalVotesAsResult = 0;
        voting.choices.forEach((choice) => {
            totalVotesAsResult += choice.votes.length;
        });
        return totalVotesAsResult;
    };

    const getVotesAsPercentage = (choiceVotes: number) => {
        return ((choiceVotes / getAllVotes()) * 100).toFixed(1);
    };

    const checkIfAlreadyVoted = () => {
        let voted = false;
        voting.choices.forEach((choice: ChoiceProps) => {
            if (choice.votes.includes(ipAddress)) {
                voted = true;
            }
        });
        return voted;
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                animateInCopyURLNotification();
                setTimeout(() => animateOutCopyURLNotification(), 2000); // Reset copied state after 1.5 seconds
            })
            .catch((err) => console.error("Failed to copy:", err));
    };

    // this checkes with a given ip and list, cause its called while the data is getting fetched, so its just to makes it functional and sort
    const getChoiceVotedByUserFromHisIpAddress = (
        ip: string,
        votingFetch: VotingProps,
    ) => {
        let possibleChoiceResult = {} as ChoiceProps;
        votingFetch.choices.forEach((choice: ChoiceProps) => {
            if (choice.votes.includes(ip)) {
                console.log(ip);
                possibleChoiceResult = choice;
            }
        });
        return possibleChoiceResult;
    };

    // do the ip checker on votes list inside each choice
    const handleChoose = (choiceId: string) => {
        const choiceIndex = voting.choices.findIndex(
            (choice) => choice.id === choiceId,
        );

        if (choiceIndex !== -1) {
            // checking if user voted already
            if (checkIfAlreadyVoted()) return;

            const updatedChoices = [...voting.choices];

            updatedChoices[choiceIndex] = {
                ...updatedChoices[choiceIndex],
                votes: [...updatedChoices[choiceIndex].votes, ipAddress],
            };

            setSelected(choiceId);
            setVoting({ ...voting, choices: updatedChoices });
            nun.setValue(id, { ...voting, choices: updatedChoices });
        }
    };

    // watch the data on db for implement the realtime, man nun-db is fk crazy tbh, nice man, its like 2 block of code to implement a realtime data
    nun.watch(id, (value: any) => {
        if (value) {
            setBlocked(false);
            if (!selected) {
                let possibleChoice = getChoiceVotedByUserFromHisIpAddress(
                    ipAddress,
                    value.value,
                );
                setSelected(possibleChoice.id);
            }
            setVoting(value.value);
        } else {
            setBlocked(true);
        }
    });

    return (
        <Container>
            <Link
                href="/"
                className="absolute top-[10%] z-[300] left-1/2 -translate-x-1/2 underline underline-offset-8"
            >
                create a <span>voting</span>
            </Link>
            <Card>
                {blocked ? (
                    <Title>Voting not found &#128533;</Title>
                ) : (
                    <div className="flex flex-col relative p-3 gap-2">
                        <TimeAgo createdAt={voting.createdAt} />
                        <div className="flex w-full flex-row justify-between items-center">
                            <h2 className="w-[90%]">{voting.title}</h2>
                            <button
                                onClick={handleCopyToClipboard}
                                className="p-3 rounded-[3px] duration-200 cursor-pointer hover:bg-zinc-800"
                            >
                                <BiLink />
                            </button>
                            <span
                                id="copytext"
                                className="ml-1 shadow-md opacity-0 text-[12px] bg-zinc-900 py-1 px-3 rounded-[2px] text-green-500 absolute top-0 left-1/2 -translate-x-1/2"
                            >
                                copied!
                            </span>
                        </div>

                        <div className="flex flex-row justify-between">
                            <p className="text-zinc-500 text-[13px]">
                                {getAllVotes()} {getAllVotes() != 1 ? "votes" : "vote"}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1 p-2 border border-zinc-200/20 h-full">
                            {voting.choices.map((choice) => (
                                <Choice
                                    percent={
                                        selected && getVotesAsPercentage(choice.votes.length)
                                    }
                                    onClick={() => {
                                        handleChoose(choice.id);
                                    }}
                                    selected={choice.id == selected}
                                    key={choice.id}
                                >
                                    {choice.value}
                                </Choice>
                            ))}
                        </div>
                    </div>
                )}
            </Card>
            {confetti && (
                <Confetti
                    className="absolute"
                    numberOfPieces={20}
                    tweenDuration={5}
                    width={width}
                    height={height}
                />
            )}
        </Container>
    );
}
