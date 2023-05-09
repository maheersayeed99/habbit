import express from "express";
import { Response, Request } from "express";
import { test, update_progress } from "../controllers/daily_status_controller";

const router = express.Router()

router.post('/test', (req: Request, res : Response) => {
    console.log(Object.keys(req));
    console.log(req.body);
    res.send(req.body);
})

router.post('/update', update_progress);


export {router}