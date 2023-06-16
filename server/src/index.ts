import express from "express"
import {router} from "./routes/routes" 
import { Express } from "express";
import bodyParser from "body-parser";

require('dotenv').config()

const schedule = require('node-schedule');

const app = express();
const update_hour : number = 9;
const update_minute : number = 30;

// const update_hour : number = 22;
// const update_minute : number = 18;

const url = "https://habbit.azurewebsites.net/api/daily";
const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  body: JSON.stringify({
    password : process.env.update_password
  }),
};


const daily_update_time_check = (app: Express, hour : number, minute : number) => {
    var date = new Date();
    console.log(date.getHours(), date.getMinutes());
    if(date.getHours() == hour && date.getMinutes() == minute)
    {
        console.log("time to update!");
        fetch(url, options)
        .then((result => {
            console.log("fetch request sent");
        }))
        .catch((error)=> {
            console.log("fetch request failed");
        })
        
    }
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 8080;
app.listen(port);
console.log("app running");

app.use("/api", router);


// const job = schedule.scheduleJob(`${update_minute} ${update_hour} * * *`, () => {
//     daily_update_time_check(app, update_hour, update_minute)
// });


// daily_update_time_check(app, update_hour, update_minute);
// setInterval(() => {
//     daily_update_time_check(app, update_hour, update_minute);

// }, 60000)

 
app.get("/", (req, res) => {

    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    console.log("HOUR" + hour);
    res.json(hour + ":" + minute);
    

} );


export { router }