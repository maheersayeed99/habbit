import {Request, Response} from "express"
import { daily_status_model } from "../models/daily_status_model"




const test = (req: Request, res : Response) => {
    return new Promise((resolve, reject) => {
        console.log("hello");
        resolve(daily_status_model.get_all_status());
    })
    .then((result) => {
        console.log("HERE");
        // console.log(result);

        res.json(result);
        return Promise.resolve(result);

    })
    .catch((error)=>{
        console.log("error")
        res.json(error);
        return error;
    })
}


const get_todo = (req: Request, res : Response) => {
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.get_todo());
    })
    .then((result) => {
        res.send(result);
        return Promise.resolve(result);
    })
    .catch((error)=>{
        console.log("error")
        res.json(error);
        return error;
    })
}

const get_streaks = (req: Request, res : Response) => {
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.get_streaks());
    })
    .then((result) => {
        res.send(result);
        return Promise.resolve(result);
    })
    .catch((error)=>{
        console.log("error")
        res.json(error);
        return error;
    })
}

const update_progress = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        const entry_to_update = req.body.activity;
        console.log(entry_to_update);
        resolve(daily_status_model.update_entry(entry_to_update));
    })

    .then((result) => {
        console.log("Done");
        console.log(result);
        res.json(result)
    })

    .catch((error) => {
        console.log(error);
        return error;
    })
}


const daily_update= (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.daily_update());
    })

    .then((result) => {
        console.log("Done");
        res.json(result)
    })

    .catch((error) => {
        console.log(error);
        return error;
    })

}


const clean_table = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.clean_all());
    })
    .then((result) => {
        console.log("Done");
        res.json(result)
    })

    .catch((error) => {
        console.log(error);
        return error;
    })
}





export {test};
export {update_progress};
export {clean_table};
export {get_todo, get_streaks, daily_update};