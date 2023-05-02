import express from "express"
import {router} from "./routes/routes" 
//import {BodyParser} from "body-parser"


var bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4000);
console.log("nodemon working");
app.use("/api", router);

app.get("/", (req, res) => {

    res.send("hello sad");
    

} );




export { router }