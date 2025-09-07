export interface CardInfo {
    title: string;
}

export interface BoardState {
    cards: CardInfo[];
    containerCards: number[][];
}

export type BoardAction = {type: "addCard", containerId: number, cardInfo: CardInfo}
    | {type: "updateCard", cardId: number, param: keyof CardInfo, value: any};

export function boardReducer(state: BoardState, action: BoardAction) {
    switch (action.type) {
        case "addCard": {
            const newCardId = state.cards.length;
            return {
                ...state,
                cards: [...state.cards, action.cardInfo],
                containerCards: state.containerCards.map((c, i) =>
                    i === action.containerId ? [...c, newCardId] : c
                ) // Deep copy, porque si simplemente hago [...state.containerCards] y modifico, como es una shallow copy, termino modificando los arrays internos y react anda mal(porque estoy modificando el estado in-place)
            }
        }
        case "updateCard": {
            return {
                ...state,
                cards: state.cards.map((c, i) =>
                    i === action.cardId ? {...state.cards[i], [action.param]: action.value } : c
                ),
            }
        }
    }
}