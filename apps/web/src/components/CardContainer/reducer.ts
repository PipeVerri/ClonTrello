export interface CardInfo {
  title: string;
}

export interface OriginalCardPlace {
  containerId: number;
  index: number;
}

interface BaseUserActions {
  dragging: number | null;
}
type UserActions = BaseUserActions &
  (
    | { mouseHoveringContainer: number; newIndex: number; originalCardPlace: OriginalCardPlace }
    | { mouseHoveringContainer: null; newIndex: null; originalCardPlace: null }
  );

interface Container {
    title: string;
    cards: number[];
}

export interface BoardState {
  cards: CardInfo[];
  containers: Container[];
  containersOrder: number[];
  userActions: UserActions;
}

export type BoardAction =
  | { type: "addCard"; containerId: number; cardInfo: CardInfo }
  | { type: "updateCard"; cardId: number; param: keyof CardInfo; value: any }
  | { type: "updateUserActions"; param: keyof UserActions; value: any } // TODO: no usar any
  | { type: "updateContainerCards"; containerId: number, newCards: number[] };

/**
 * Reducer dedicado a cambiar el boardState
 * @param state - Pasado por react al usar useReducer
 * @param action - Lo que se quiere cambiar en el estado
 * @returns El nuevo boardState
 *
 * @remarks
 * Las acciones y sus argumentos son:
 * - "addCard": Agrega una nueva tarjeta, sus argumentos son:
 *      - "containerId": El ID del container a agregarla
 *      - "cardInfo": La tarjeta por defecto a agregar
 * - "updateCard": Edita una tarjeta, sus argumentos son:
 *      - "cardId": El ID de la carta a editar
 *      - "param": El parametro a editar
 *      - "value": El nuevo valor a setear
 * - "updateUserActions": Sus argumentos son iguales que updateCard pero sin el cardId
 * - "updateContainerCards": Su unico argumento es "newContainerCards", el objeto entero reemplazado
 */
export function boardReducer(state: BoardState, action: BoardAction) {
  switch (action.type) {
    case "addCard": {
      const newCardId = state.cards.length;
      return {
        ...state,
        cards: [...state.cards, action.cardInfo],
        containers: state.containers.map((c, i) =>
            (i === action.containerId) ? {...c, cards: [...c.cards, newCardId]} : c
        )
      };
    }
    case "updateCard": {
      return {
        ...state,
        cards: state.cards.map((c, i) =>
          i === action.cardId ? { ...state.cards[i], [action.param]: action.value } : c,
        ),
      };
    }
    case "updateContainerCards": {
      return {
        ...state,
        containers: state.containers.map((c, i) =>
            (i === action.containerId) ? {...c, cards: action.newCards } : c
        )
      };
    }
    case "updateUserActions": {
      return {
        ...state,
        userActions: {
          ...state.userActions,
          [action.param]: action.value,
        },
      };
    }
  }
}
