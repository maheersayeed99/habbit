import {Request, Response} from "express"
import { daily_status_model } from "../models/daily_status_model"


// const update_entry = (req: Request, res: Response) => {
//     console.log("testing");
//     return new Promise<void>(() => {

//         const change = req.body.activity_to_update;
//         daily_status_model.update_entry(change);
//     })
//     .then(() => {
//         res.send("updated");
//     })
//     .then(() => {

//         daily_status_model.get_all_status();

//     }) 
//     .catch((error) => {
//         console.log("controller could not update");
//         console.log(error.message);
//     })

// }



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

const update_progress = (req: Request, res: Response) => {
    return new Promise((resolve, reject) => {
        const entry_to_update = req.body.activity;
        console.log(entry_to_update);
        resolve(daily_status_model.update_entry(entry_to_update));
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