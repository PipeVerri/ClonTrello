import {Router} from "express";
import * as ctrl from "../controllers/board.controller";

const r = Router();

r.post("/createBoard", ctrl.createBoardHandler)
r.post("/updateBoard", ctrl.updateBoardHandler)

export default r;