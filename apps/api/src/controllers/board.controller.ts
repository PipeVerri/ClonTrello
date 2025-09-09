import {Request, Response} from 'express'
import {createBoard, getBoardData, updateBoard} from "../services/board.service";
import {QueryBoardReq} from "@my/validation/board";

export async function createBoardHandler(req: Request, res: Response) {
    try {
        const {title} = res.locals.validated_body
        const id = await createBoard(title)
        res.status(201).send({id: id})
    } catch (err) {
        console.error(err)
        res.status(500).send({error: err})
    }
}

export async function updateBoardHandler(req: Request, res: Response) {
    try {
        const {id, boardData} = res.locals.validated_body
        await updateBoard(id, boardData)
        res.status(201).send({status: "success"})
    } catch (err) {
        console.error(err)
        res.status(500).send({error: err})
    }
}

export async function getBoardHandler(req: Request<{}, any, any, QueryBoardReq>, res: Response) {
    try {
        const {id} = res.locals.validated_query
        const board = await getBoardData(id)
        res.status(200).send({boardData: board.data})
    } catch (err) {
        console.error(err)
        res.status(500).send({error: err})
    }
}