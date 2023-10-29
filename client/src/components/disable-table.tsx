import React from "react";
import "../stylesheets/table.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"
// import path from "path"
// require('dotenv').config()

const DisableTable : React.FC = () => {

    const [table_data, get_data] = useState([])

    const updateTable = async () => {
        // console.log(process.env.proxy)
        let proxy = "http://localhost:8080"
        // let proxy = "https://habbit.azurewebsites.net"
        // let proxy = "";
        const table_response = await axios.get(proxy + "/api/disabled")
        console.log(table_response)
        console.log(await table_response.data);
        if (Array.isArray(table_response.data) === true){
            get_data(table_response.data)
        }
    }

    const toggle_activity = async (item:any) => {

        const elementWithClassName = await document.querySelector('.Activate_Button');
        if (elementWithClassName) {
            if (elementWithClassName.classList.contains("active")){
            
                const attempt = await prompt("Enter password: ");
                if (await authenticate(attempt)){
                    let data = {
                        "activity":item.activity,
                        "password":attempt,
                    }
                    let headers = {
                        headers: {
                        'Content-Type': 'application/json', // Set the content type of the request
                        },
                    }
                    let proxy = "http://localhost:8080";
                    await axios.post(proxy + "/api/toggle", data, headers)
                    window.location.reload();
                }
                else{
                    alert("Authentication Failed!")
                    console.log("no")
                }
            }
        }
    }


    useEffect(()=>{
        updateTable();
    },[])

    return (
        <table className="disable-table">
            <thead>
            <tr>
                <th>Disabled Activity</th>
                <th colSpan={2}>Streak / Max</th>
            </tr>
            </thead>
            <tbody>
            {table_data.map((item, index) => (
                <Row className="disabled-row" data={item} enable={()=>{toggle_activity(item)}}/>
            ))}


            </tbody>
            
        </table>
    );



}

export {DisableTable}


