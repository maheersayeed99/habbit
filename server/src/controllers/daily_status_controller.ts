import {Request, Response} from "express"
import { daily_status_model } from "../models/daily_status_model"

const get_all = (req: Request, res : Response) => {
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.get_all_status());
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
        const password = req.body.password;

        console.log(entry_to_update);
        resolve(daily_status_model.update_entry(entry_to_update, password));
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
    const password = req.body.password;
    return new Promise((resolve, reject) => {
        resolve(daily_status_model.daily_update(password));
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
    const password = req.body.password;

    return new Promise((resolve, reject) => {
        resolve(daily_status_model.clean_all(password));
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


export {get_todo, get_streaks, daily_update, update_progress, clean_table, get_all};
