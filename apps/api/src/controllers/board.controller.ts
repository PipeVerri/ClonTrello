import {Request, Response} from 'express'
import {createBoard, updateBoard} from "../services/board.service";

export async function createBoardHandler(req: Request, res: Response) {
    try {
        const id = await createBoard(req.body.title)
        res.status(201).send({id: id})
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}

export async function updateBoardHandler(req: Request, res: Response) {
    try {
        await updateBoard(req.body.id, req.body.boardData)
        res.status(201).send({status: "success"})
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}