import {prisma} from "@my/db"
import {Prisma} from "@prisma/client"

export async function createBoard(title: string) {
    const defaultBoard: Prisma.InputJsonObject = {
        cards: [
            {title: "Test card"}
        ],
        containers: [
            {title: "Test container", cards: [0]}
        ],
        containersOrder: [0]
    }

    const board = await prisma.board.create({data: {title: title, data: defaultBoard}})
    return board.id
}

export async function updateBoard(boardId: string, newData: Prisma.InputJsonObject) {
    await prisma.board.update({
        where: {id: boardId},
        data: { data: newData }
    })
}

export async function getBoardData(boardId: string) {
    const board = await prisma.board.findUnique({
        where: {id: boardId},
    })
    if (!board) {
        throw new Error("Board doesn't exist")
    }
    return board
}