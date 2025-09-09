import {prisma} from "@my/db"

export async function createBoard(title: string) {
    const board = await prisma.board.create({data: {title: title}})
    return board.id
}