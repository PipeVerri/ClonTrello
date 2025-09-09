import {Request, Response} from 'express'
import {createBoard} from "../services/board.service";

export async function createBoardHandler(req: Request, res: Response) {
    try {
        const id = await createBoard(req.body.title)
        res.status(201).send({id: id})
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal server error")
    }
}