"use client";

import CardContainer from "../components/CardContainer/CardContainer";
import {useEffect, useReducer, useState} from "react";
import {boardReducer, BoardState} from "../components/CardContainer/reducer";
import MouseFollower from "../components/MouseFollower/MouseFollower";
import Card from "../components/Card/Card";
import {normalizeUrl} from "next/dist/build/webpack/loaders/css-loader/src/utils";
import {before} from "node:test";

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
        ],
        userActions: {
            dragging: null,
            mouseHoveringContainer: null,
            newIndex: null,
            originalCardPlace: null,
        }
    })

    const [log, setLog] = useState(false)
    useEffect(() => {
        console.log(`${state.userActions.dragging} | ${state.userActions.mouseHoveringContainer} | ${state.userActions.newIndex}`);
    }, [state]);

    const handleRelease = (currentState: BoardState) => {
        const {mouseHoveringContainer, newIndex, originalCardPlace, dragging} = currentState.userActions;
        if (mouseHoveringContainer != null && dragging != null) {
            // Borrarla de su container original
            const removedContainerCards = currentState.containerCards.map((c, i) =>
                i === originalCardPlace.containerId ? c.toSpliced(originalCardPlace.index, 1) : c
            )
            // Ahora meterla en donde deberia ser metida
            removedContainerCards[mouseHoveringContainer] = [
                ...removedContainerCards[mouseHoveringContainer].slice(0, newIndex),
                dragging, // Dragging es el ID de la carta
                ...removedContainerCards[mouseHoveringContainer].slice(newIndex),
            ]
            dispatch({type: "updateContainerCards", newContainerCards: removedContainerCards})
        }
        dispatch({type: "updateUserActions", param: "dragging", value: null})
        dispatch({type: "updateUserActions", param: "originalCardPlace", value: null})
        dispatch({type: "updateUserActions", param: "newIndex", value: null})
        setLog(true)
    }

    return (
      <div className="bg-gradient-to-br from-blue-800 to-teal-400 min-h-screen">
          <div className="flex flex-row gap-6 p-4">
              {state.containerCards.map((_, index) => (
                  <CardContainer id={index} key={index} state={state} dispatch={dispatch} />
              ))}
              <MouseFollower onRelease={() => handleRelease(state)}>
                  {state.userActions.dragging != null && <Card id={state.userActions.dragging} state={state} dispatch={dispatch} dragging={true}/>}
              </MouseFollower>
          </div>
      </div>
  )
}
