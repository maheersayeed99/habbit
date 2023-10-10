import React from "react";
import "../stylesheets/table.css"
import { Row } from "./row.tsx";

const Table : React.FC = () => {
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
        </div>
    );
  }
  
  export {Table};