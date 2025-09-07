"use client";

import CardContainer from "../components/CardContainer/CardContainer";
import {useEffect, useReducer, useState} from "react";
import {boardReducer} from "../components/CardContainer/reducer";
import MouseFollower from "../components/MouseFollower/MouseFollower";
import Card from "../components/Card/Card";

export interface Editing {
    dragging: number | null,
    mouseHoveringContainer: number | null,
}

export default function Page() {
    const [board, boardDispatch] = useReducer(boardReducer, {
        cards: [
            {title: "test1"},
            {title: "test2"},
            {title: "test3"},
        ],
        containerCards: [
            [0, 1],
            [2]
        ]
    })

    const [editing, setEditing] = useState<Editing>({
        dragging: null,
        mouseHoveringContainer: null,
    })

    const handleRelease = () => {
        setEditing(oldVal => {
            return {...oldVal, dragging: null};
        })
    }

    return (
      <div className="bg-gradient-to-br from-blue-800 to-teal-400 min-h-screen">
          <div className="flex flex-row gap-6 p-4">
              {board.containerCards.map((_, index) => (
                  <CardContainer id={index} key={index} state={board} dispatch={boardDispatch} editing={editing} setEditing={setEditing} />
              ))}
              <MouseFollower onRelease={handleRelease}>
                  {editing.dragging != null && <Card id={editing.dragging} state={board} dispatch={boardDispatch} setEditing={setEditing}/>}
              </MouseFollower>
          </div>
      </div>
  )
}
