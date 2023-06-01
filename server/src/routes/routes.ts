import express from "express";
import { Response, Request } from "express";
import { test, update_progress, clean_table, get_todo, get_streaks, daily_update } from "../controllers/daily_status_controller";

const router = express.Router()

router.post('/test', (req: Request, res : Response) => {
    console.log(Object.keys(req));
    console.log(req.body);
    res.send(req.body);
})

router.post('/update', update_progress);
router.post('/clean', clean_table);
router.get('/todo', get_todo);
router.get('/streaks', get_streaks);
router.post('/daily', daily_update);

export {router}