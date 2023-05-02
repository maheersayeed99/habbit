import express from "express";
import { Response, Request } from "express";

const router = express.Router()

router.post('/test', (req: Request, res : Response) => {
    console.log(Object.keys(req));
    console.log(req.body);
    res.send(req.body);
})



export {router}