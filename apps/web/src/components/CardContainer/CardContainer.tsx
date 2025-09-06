import Card from "../Card/Card";
import {Setter} from "../../utils/types";
import {CardInfo} from "../../app/page";

interface CardContainerProps {
    id: number,
    containerCards: number[][],
    setContainerCards: Setter<number[][]>,
    cards: CardInfo[],
    setCards: Setter<CardInfo[]>,
}

export default function CardContainer({ id, containerCards, setContainerCards, cards, setCards }: CardContainerProps) {
    return (
        <div className="flex flex-col bg-amber-200 w-[300px] gap-2 p-4 rounded-lg drop-shadow-lg">
            {containerCards[id].map((index, _) => (
                <Card key={index} id={index} data={cards[index]} setData={(param, val) => setCards(oldVal => {
                    oldVal[index][param] = val
                    return [...oldVal];
                })} />
            ))}
        </div>
    )
}