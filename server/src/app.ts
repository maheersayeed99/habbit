import express from "express"
import {router} from "./routes/routes" 
import { Express } from "express";
// import {BodyParser} from "body-parser"
import bodyParser from "body-parser";



const app = express();
const update_hour : number = 21;
const update_minute : number = 13;


const daily_update_time_check = (app: Express, hour : number, minute : number) => {
    var date = new Date();
    console.log(date.getHours())
    if(date.getHours() == hour && date.getMinutes() == minute)
    {
        console.log("time to update!");
        app.get("/api/daily", (req,res)=> {
            res.send("done");
        })
    }
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 1311;
app.listen(port);
console.log("nodemon working");

app.use("/api", router);



// daily_update_time_check(app, update_hour, update_minute);
// setInterval(() => {
//     daily_update_time_check(app, update_hour, update_minute);

// }, 60000)

 
app.get("/", (req, res) => {

    res.send("hello sad");
    

} );





export { router }