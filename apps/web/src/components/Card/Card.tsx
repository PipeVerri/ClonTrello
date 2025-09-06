"use client";

import {CardInfo} from "../../app/page";

export interface CardProps {
    id: number;
    data: CardInfo;
    setData: <k extends keyof CardInfo>(field: k, value: CardInfo[k]) => void;
}

export default function Card({ id, data, setData }: CardProps) {
    return (
        <div className="bg-white rounded-md shadow-md p-1.5 border-0">
            <input type="text" value={data.title} onChange={(e) => setData("title", e.target.value)} />
        </div>
    )
}