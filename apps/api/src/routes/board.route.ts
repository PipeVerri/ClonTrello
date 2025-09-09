import {Router} from "express";
import * as ctrl from "../controllers/board.controller";

const r = Router();

r.post("/createBoard", ctrl.createBoardHandler)

export default r;