import { formatCreatedAt } from "@/utils/time";
import { useEffect, useState } from "react";

export default function TimeAgo({ createdAt }: {createdAt: number}) {
    const [timeAgo, setTimeAgo] = useState(formatCreatedAt(createdAt));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeAgo(formatCreatedAt(createdAt));
        }, 1000);

        return () => clearTimeout(timer);
    }, [createdAt]);

    return (
        <p className="text-zinc-500 text-[13px] -mb-3">
            {timeAgo}
        </p>
    );
};