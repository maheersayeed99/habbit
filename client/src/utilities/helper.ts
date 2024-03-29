
import axios from "axios";

let proxy = "http://localhost:8080"

const authenticate = async (attempt: string) => {
    const data = {
        attempt: attempt,
    }
    console.log(data)
    const response = await axios.post(proxy+ "/api/authenticate", data, {
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