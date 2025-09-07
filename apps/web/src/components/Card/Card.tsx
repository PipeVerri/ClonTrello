"use client";

import {BoardAction, BoardState, CardInfo} from "../CardContainer/reducer";
import {Dispatch, useState} from "react";
import {Setter} from "../../utils/types";
import {Editing} from "../../app/page";

interface CardProps {
    id: number;
    state: BoardState;
    dispatch: Dispatch<BoardAction>;
    setEditing: Setter<Editing>;
}

export default function Card({ id, state, dispatch, setEditing }: CardProps) {
    const placeholder = "Titulo..."

    const handlePress = () => {
        setEditing(oldVal => {
            return {
                ...oldVal,
                dragging: id
            }
        });
    }

    const data = state.cards[id];
    return (
        <div className="bg-white rounded-md shadow-md p-2 border-0 py-3" onMouseDown={handlePress}>
            <input
                type="text"
                value={data.title}
                onChange={(e) => dispatch({type: "updateCard", cardId: id, param: "title", value: e.target.value})}
                onMouseDown={(e) => {e.stopPropagation()}} // Asi si me clickean, no lo captura el padre y no hago drag
                placeholder={placeholder}
                className={"overflow-hidden text-ellipsis block w-full"}
                size={Math.max(placeholder.length, data.title.length)}
            />
        </div>
    )
}