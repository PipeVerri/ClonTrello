import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {BoardAction, BoardState, CardInfo} from "./reducer";
import {Dispatch} from "react";
import Card from "../Card/Card";

interface CardContainerProps {
    id: number,
    state: BoardState,
    dispatch: Dispatch<BoardAction>,
}

export default function CardContainer({ id, state, dispatch }: CardContainerProps) {
    function createCard() {
        const defaultCard: CardInfo = {
            title: ""
        }
        dispatch({type: "addCard", containerId: id, cardInfo: defaultCard})
    }

    return (
        <div className="flex flex-col bg-amber-200 w-[300px] gap-2 p-4 rounded-lg drop-shadow-lg">
            {state.containerCards[id].map((index, _) => (
                <Card key={index}
                      data={state.cards[index]}
                      setData={(field, value) => dispatch({type: "updateCard", cardId: index, param: field, value: value})}
                />
            ))}
            <button className="bg-green-500 text-center text-lg py-2 font-semibold text-white rounded-lg shadow-lg" onClick={createCard}>
                <FontAwesomeIcon icon={faSquarePlus} size="lg" />
            </button>
        </div>
    )
}