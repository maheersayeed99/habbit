import React from "react";
import "../stylesheets/table.css"
// import { Row } from "./row.tsx";
import { useState, useEffect} from "react";
import axios from "axios"

const Table : React.FC = () => {

    const [table_data, get_data] = useState([])

    const updateTable = async () => {
        const table_response = await axios.get("http://localhost:8080/api/main", {headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }})
        console.log(await table_response);
        // const json_response = await table_response.json()
        // console.log(json_response)
        // get_data(json_response)
    }

    updateTable();
    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Activity</th>
                    <th colSpan={2}>Streak / Max</th>
                </tr>
                </thead>
                
            </table>
            <span>
            {table_data}
            </span>
        </div>
        
    );
  }
  
  export {Table};