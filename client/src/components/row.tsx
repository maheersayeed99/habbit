import React from "react";
import "../stylesheets/table.css"

const Row = (progress_class:string, percentage:number, activity: string, brightness:number, streak:number, max_streak:number, max_brightness:number) => {
    
    return (
        
        <tr>
            
            <td className={`activity-cell ${progress_class}`} >
                <div className={`activity-progress ${progress_class}`} style={ {width: `${percentage}%`}}></div>
                <span className="activity-text">{activity}</span>
            </td>

            <td className="streak-cell" style={{filter: `brightness(${brightness});`}}>
                <div className="streak-text">{streak}</div>
            </td>
            
            <td className="max-cell" style={{filter: `brightness(${max_brightness});`}}>
                <div className="streak-text">{max_streak}</div>
            </td>

        </tr>
        
    );
  }
  
  export {Row};