import express from "express"
import {router} from "./routes/routes" 


const app = express();
app.listen(4000);
console.log("nodemon working");
app.use("/api", router);

app.get("/", (req, res) => {

    res.send("hello sad");
    

} );




export { router }