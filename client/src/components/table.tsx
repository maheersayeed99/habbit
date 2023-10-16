import React from "react";
import "../stylesheets/table.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"
// import path from "path"
// require('dotenv').config()

const Table : React.FC = () => {

    const [table_data, get_data] = useState([])

    const [staged_activities, stage] = useState([]);

    const updateTable = async () => {
        // console.log(process.env.proxy)
        // let proxy = "http://localhost:8080"
        let proxy = "https://habbit.azurewebsites.net"
        // let proxy = "";
        const table_response = await axios.get(proxy + "/api/main")
        console.log(table_response)
        console.log(await table_response.data);
        if (Array.isArray(table_response.data) === true){
            get_data(table_response.data)
        }
    }

    const stage_activity = async (item: any) => {
        await staged_activities.push(item.activity);
        // item.progress += 1;
        await stage(staged_activities);
        await console.log(staged_activities)
    }

    const clear_stage = async () => {
        await stage([]);
        await console.log(staged_activities);
    }

    const submit_form = async (event) => {

        event.preventDefault();

        const attempt = await prompt("Enter password: ");
        if (await authenticate(attempt)){
            for (const activity of staged_activities){
                let data = {
                    "activity":activity,
                    "password":attempt,
                }
                let headers = {
                    headers: {
                      'Content-Type': 'application/json', // Set the content type of the request
                    },
                }
                await axios.post("/api/update", data, headers)
            }       
        }
        else{
            console.log("no")
        }

        window.location.reload();
    }


    useEffect(()=>{
        updateTable();
    },[])

    return (
        <form onSubmit={submit_form}>
        <div className="table-container">
            

            <Buttons handleClear={clear_stage} handleSubmit = {submit_form}/>

            

            <table>
                <thead>
                <tr>
                    <th>Activity</th>
                    <th colSpan={2}>Streak / Max</th>
                </tr>
                </thead>
                <tbody>

                {table_data.map((item, index) => (
                    <Row data={item} staged_activities={staged_activities} onClick={()=>{stage_activity(item)}}/>
                ))}

                </tbody>
                
            </table>

            
            
            <span>
            </span>
        </div>
        </form>
        
    );
  }
  
  export {Table};