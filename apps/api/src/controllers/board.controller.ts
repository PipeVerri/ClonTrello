import {Request, Response} from 'express'
import {createBoard, deleteBoard, getAllBoards, getBoardData, updateBoard} from "../services/board.service.ts";
import {QueryBoardReq} from "@my/validation/board";

export async function createBoardHandler(req: Request, res: Response) {
    const {title} = res.locals.validated_body
    const id = await createBoard(title)
    res.status(201).json({id: id})
}

export async function updateBoardHandler(req: Request, res: Response) {
    const {id, data} = res.locals.validated_body
    console.log(`new board data ${data}`)
    await updateBoard(id, data)
    res.status(201).json({status: "success"})
}

export async function getBoardHandler(req: Request<{}, any, any, QueryBoardReq>, res: Response) {
    const {id} = res.locals.validated_query
    const board = await getBoardData(id)
    res.status(200).json({data: board.data})
}

export async function deleteBoardHandler(req: Request, res: Response) {
    const {id} = res.locals.validated_body
    await deleteBoard(id)
    res.status(200).json({status: "success"})
}

export async function getAllBoardsHandler(req: Request, res: Response) {
    const boards = await getAllBoards()
    res.status(200).json(boards)
}