import express from "express";
import { Response, Request } from "express";

const router = express.Router()

router.get("/test", (req: Request, res : Response) => {
    console.log(req.body);
    res.json(req.body);
})



export {router}