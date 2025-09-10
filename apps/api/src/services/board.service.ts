import {prisma} from "@my/db"
import {Prisma} from "@prisma/client"
import {AppError} from "../utils/appError";

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
    try {
        await prisma.board.update({
            where: { id: boardId },
            data: { data: newData },
        });
    } catch (err: any) {
        if (err.code === "P2025") throw new AppError("Board doesn't exist", 404);
        throw err;
    }
}

export async function getBoardData(boardId: string) {
    const board = await prisma.board.findUnique({
        where: {id: boardId},
    })
    if (!board) throw new AppError("Board doesn't exist", 404)
    return board
}

export async function deleteBoard(boardId: string) {
    try {
        await prisma.board.delete({
            where: {id: boardId},
        })
    } catch (err: any) {
        if (err.code === "P2025") throw new AppError("Board doesn't exist", 404);
        throw err;
    }
}

export async function getAllBoards() {
    return prisma.board.findMany({
        select: {id: true, title: true},
    })
}