import React from "react";
import "../stylesheets/table.css"
import { Row } from "./row.tsx";
import { useState, useEffect} from "react";
import axios from "axios"

const Table : React.FC = () => {

    const [table_data, get_data] = useState([])

    const updateTable = async () => {
        const table_response = await axios.get("/api/main")
        console.log(await table_response.data);
        get_data(table_response.data)
    }

    useEffect(()=>{updateTable()},[])

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Activity</th>
                    <th colSpan={2}>Streak / Max</th>
                </tr>
                </thead>
                <tbody>

                {table_data.map((item, index) => (
                    <Row data={item}/>
                ))}

                </tbody>
                
            </table>
            
            <span>
            </span>
        </div>
        
    );
  }
  
  export {Table};