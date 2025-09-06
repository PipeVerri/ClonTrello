"use client";

import CardContainer from "../components/CardContainer/CardContainer";
import {useEffect, useState} from "react";

export interface CardInfo {
    title: string;
}

export default function Page() {
    const [cards, setCards] = useState<CardInfo[]>([
        {title: "card0"},
        {title: "card1"},
        {title: "card2"},
    ])
    const [containerCards, setContainerCards] = useState<number[][]>([
        [0, 1],
        [2]
    ]);

    useEffect(() => {
        console.log(cards)
    }, [cards])

    return (
      <div className="bg-gradient-to-br from-blue-800 to-teal-400 min-h-screen">
          <div className="flex flex-row gap-6 p-4">
              {containerCards.map((_, index) => (
                  <CardContainer id={index} key={index} containerCards={containerCards} setContainerCards={setContainerCards} cards={cards} setCards={setCards} />
              ))}
          </div>
      </div>
  )
}
