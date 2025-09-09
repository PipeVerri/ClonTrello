interface Card {
    title: string;
}

interface Container {
    title: string;
    cards: number[];
}

export interface BoardData {
    cards: Card[]
    containers: Container[]
    containersOrder: number[]
}