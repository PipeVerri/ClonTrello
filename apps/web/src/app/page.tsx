"use client";

import CardContainer from "../components/CardContainer/CardContainer";
import {useReducer} from "react";
import {boardReducer} from "../components/CardContainer/reducer";

export default function Page() {
    const [state, dispatch] = useReducer(boardReducer, {
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

    return (
      <div className="bg-gradient-to-br from-blue-800 to-teal-400 min-h-screen">
          <div className="flex flex-row gap-6 p-4">
              {state.containerCards.map((_, index) => (
                  <CardContainer id={index} key={index} state={state} dispatch={dispatch} />
              ))}
          </div>
      </div>
  )
}
