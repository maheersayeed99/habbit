import React from "react";
import "../stylesheets/table.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"
import { Modal } from "./modal.tsx";
// import path from "path"
// require('dotenv').config()

let proxy = "http://localhost:8080"
// let proxy = "https://habbit.azurewebsites.net"

const Table : React.FC = () => {

    const [table_data, get_data] = useState([])

    const [staged_activities, stage] = useState([]);

    const [active, toggle] = useState(false);

    const updateTable = async () => {
        // console.log(process.env.proxy)
        
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

    const toggle_track = async () => {
        
        const elementWithClassName = await document.querySelector('.Activate_Button');
        if (elementWithClassName) {
            if (elementWithClassName.classList.contains("active")){
                elementWithClassName.classList.remove('active');
                toggle(false);
            }
            else{
                elementWithClassName.classList.add('active');
                toggle(true);
            }
        }
    }

    const toggle_activity = async (item:any) => {
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
            // let proxy = "https://habbit.azurewebsites.net";
            await axios.post(proxy + "/api/toggle", data, headers)
            window.location.reload();
        }
        else{
            alert("Authentication Failed!")
            console.log("no")
        }


    }

    const submit_form = async (event) => {

        
        // event.preventDefault();
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
                await axios.post(proxy + "/api/update", data, headers)
            }    
            window.location.reload();   
        }
        else{
            alert("Authentication Failed!")
            console.log("no")
        }

        
    }


    useEffect(()=>{
        updateTable();
    },[])

    return (
        <div className="table-container">
            {/* <Modal></Modal> */}

            <Buttons handleClear={clear_stage} handleSubmit = {submit_form} handleTrack = {toggle_track}/>

            

            <table className="main-table">
                <thead>
                <tr>
                    <th>Activity</th>
                    <th colSpan={2}>Streak / Max</th>
                </tr>
                </thead>
                <tbody>

                {table_data.map((item, index) => (
                    <Row data={item} staged_activities={staged_activities} onClick={()=>{if (active){toggle_activity(item)} else{stage_activity(item)}}}/>
                ))}

                </tbody>
                
            </table>
            
        </div>
        
    );
  }
  
  export {Table};