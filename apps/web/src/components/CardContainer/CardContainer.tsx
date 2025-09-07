import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type Dispatch, useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import type { BoardAction, BoardState, CardInfo } from "./reducer";

interface CardContainerProps {
  id: number;
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

export default function CardContainer({ id, state, dispatch }: CardContainerProps) {
  // Las refs de las tarjetas para poder saber su posicion
  const cardsRef = useRef<Record<number, HTMLDivElement | null>>({});
  const [mouseHovering, setMouseHovering] = useState<boolean>(false);

  function createCard() {
    const defaultCard: CardInfo = {
      title: "",
    };
    dispatch({ type: "addCard", containerId: id, cardInfo: defaultCard });
  }

  const handleMouseEnter = () => {
    setMouseHovering(true);
    dispatch({ type: "updateUserActions", param: "mouseHoveringContainer", value: id });
  };
  const handleMouseLeave = () => {
    setMouseHovering(false);
    dispatch({ type: "updateUserActions", param: "mouseHoveringContainer", value: null });
    //dispatch({type: "updateUserActions", param: "newIndex", value: null})
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseHovering && state.userActions.dragging != null) {
        let newIndex = 0;
        for (let i = 0; i < state.containerCards[id].length; i++) {
          const cardRef = cardsRef.current[i];
          if (cardRef) {
            const rect = cardRef.getBoundingClientRect();
            if (e.clientY > rect.bottom) {
              newIndex = i + 1;
            } else {
              break; // Se que para las cajas de abajo tambien va a ser falsa esta condicion
            }
          }
        }
        dispatch({ type: "updateUserActions", param: "newIndex", value: newIndex });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseHovering, state, dispatch, id]);

  return (
    // biome-ignore lint: no es interactivo, solo quiero ver si hay un hover o no
    <div
      className="flex flex-col bg-amber-200 min-w-[300px] gap-2 p-4 rounded-lg drop-shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {state.containerCards[id].map((cardId, index) =>
        state.userActions.dragging === cardId ? null : (
          <Card
            key={cardId}
            id={cardId}
            state={state}
            dispatch={dispatch}
            originalPlace={{ containerId: id, index: index }}
            innerRef={(el) => {
              cardsRef.current[id] = el;
            }}
          />
        ),
      )}
      <button
        className="bg-green-500 text-center text-lg py-2 font-semibold text-white rounded-lg shadow-lg"
        onClick={createCard}
        type="button"
      >
        <FontAwesomeIcon icon={faSquarePlus} size="lg" />
      </button>
    </div>
  );
}
