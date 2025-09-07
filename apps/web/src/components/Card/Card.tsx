"use client";

import {BoardAction, BoardState, CardInfo, OriginalCardPlace} from "../CardContainer/reducer";
import React, {Dispatch, useState} from "react";
import {Setter} from "../../utils/types";

interface BaseCardProps {
    id: number;
    state: BoardState;
    dispatch: Dispatch<BoardAction>;
    originalPlace?: OriginalCardPlace;
}
type CardProps = BaseCardProps & (
      {dragging?: false, originalPlace: OriginalCardPlace, innerRef: (el: HTMLDivElement) => void; }
    | {dragging: true, originalPlace?: null, innerRef?: (el: HTMLDivElement) => void; });

export default function Card({ id, state, dispatch, dragging=false, originalPlace, innerRef=(el) => {} }: CardProps) {
    const placeholder = "Titulo..."

    const handlePress = () => {
        if (!dragging) {
            dispatch({type: "updateUserActions", param: "dragging", value: id});
            dispatch({type: "updateUserActions", param: "originalCardPlace", value: originalPlace});
        }
    }

    const data = state.cards[id];
    return (
        <div className="bg-white rounded-md shadow-md p-2 border-0 py-3 w-card" onMouseDown={handlePress} ref={innerRef}>
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