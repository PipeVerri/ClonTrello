import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import {BoardAction, BoardState, CardInfo} from "./reducer";
import {Dispatch} from "react";
import Card from "../Card/Card";
import {Setter} from "../../utils/types";

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

    const handleMouseEnter = () => {
        dispatch({type: "updateUserActions", param: "mouseHoveringContainer", value: id})
    }
    const handleMouseLeave = () => {
        dispatch({type: "updateUserActions", param: "mouseHoveringContainer", value: null})
    }

    return (
        <div className="flex flex-col bg-amber-200 gap-2 p-4 rounded-lg drop-shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {state.containerCards[id].map((id, _) => (
                (state.userActions.dragging === id) ? null : <Card key={id} id={id} state={state} dispatch={dispatch} />
            ))}
            <button className="bg-green-500 text-center text-lg py-2 font-semibold text-white rounded-lg shadow-lg" onClick={createCard}>
                <FontAwesomeIcon icon={faSquarePlus} size="lg" />
            </button>
        </div>
    )
}