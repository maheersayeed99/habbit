import React from "react";
import "../stylesheets/table.css"

const Row = (props) => {


    var progress_class = "";        
        
    if (props.data.completed == false) {
        progress_class = "red-progress";
    }
    else if(props.data.completed_today == false) {
        progress_class = "yellow-progress";
    }
    else{
        progress_class = "green-progress";
    }

    var percentage = 100*(props.data.progress/props.data.frequency);
    const floor = 0.80;
    const ceiling = 1.5;
    const max_streak = 30;
    var streak_brightness = floor + ((Math.min(props.data.streak,max_streak)/max_streak)* (ceiling-floor));
    var max_brightness = floor + ((Math.min(props.data.max_streak,max_streak)/max_streak)* (ceiling-floor));
    var activity = props.data.activity[0].toUpperCase() + props.data.activity.slice(1)
    
    return (
        
        <tr>

            <td className={`activity-cell ${progress_class}`} >
                <div className={`activity-progress ${progress_class}`} style={ {width: `${percentage}%`}}></div>
                <span className="activity-text">{activity}</span>
            </td>

            <td className="streak-cell" style={{filter: `brightness(${streak_brightness})`}}>
                <div className="streak-text">{props.data.streak}</div>
            </td>
            
            <td className="max-cell" style={{filter: `brightness(${max_brightness})`}}>
                <div className="streak-text">{props.data.max_streak}</div>
            </td>

        </tr>
        
    );
  }
  
  export {Row};