import {Router} from "express";
import * as ctrl from "../controllers/board.controller";
import {validate} from "../middleware/validate";
import {CreateBoardReq, QueryBoardReq, UpdateBoardReq} from "@my/validation/board";

const r = Router();

r.post("/createBoard", validate(CreateBoardReq), ctrl.createBoardHandler)
r.post("/updateBoard", validate(UpdateBoardReq), ctrl.updateBoardHandler)
r.get("/getBoard", validate(QueryBoardReq, "query"), ctrl.getBoardHandler)

export default r;