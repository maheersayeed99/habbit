
import axios from "axios";

const authenticate = async () => {
    const attempt = await prompt("Enter password: ");

    const data = {
        attempt: attempt,
    }
    console.log(data)
    const response = await axios.post("/api/authenticate", data, {
        headers: {
          'Content-Type': 'application/json', // Set the content type of the request
        },
    })
    console.log(response)
    if (response.data){
        console.log("matched")
        return true
    }
    else{
        console.log("didnt match")
        return false;
    }
}


export {authenticate}