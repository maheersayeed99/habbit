
import { Pool_Object, Pool_Query } from "./models/daily_status_model"; 

const get_data = () => {
    const url = "https://habbit.azurewebsites.net/api/main";
    // const url = "http://localhost:8080/api/main"
    
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        // Handle the response data
        return Promise.resolve(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
        return error
    });
}


const render_html = (table_data: Array<Pool_Object>) => {
    const header = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Activity Table</title>
      <style>
        /* Center the table on the page */
        .table-container {
          display: flex;
          justify-content: center;
        }
    
        table {
          border-collapse: collapse;
          width: 40%;
          border-radius: 10px; /* Add border radius to round corners */
          overflow: hidden; /* Hide overflowing content */
        }
    
        th, td {
          padding: 8px;
          text-align: center; /* Center the text in all columns */
          color: #333; /* Darker text color */
          width:50%;
          
        }
    
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
    
        .activity-cell {
          padding: 0;
          position: relative;
        }
    
        .activity-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          z-index: 1;
        }
    
        .yellow-progress {
          background-color: gold;
        }
    
        .green-progress {
          background-color: mediumturquoise;
        }
    
        .red-progress {
          background-color: tomato;
        }
    
        .activity-text {
          position: relative;
          z-index: 2;
          color: black; /* Set font color to black */
        }
    
        /* Set default background colors based on progress bar colors */
        .activity-cell.yellow-progress {
          background-color: lightgoldenrodyellow;
        }
    
        .activity-cell.green-progress {
          background-color: lightgreen;
        }
    
        .activity-cell.red-progress {
          background-color: pink;
        }
    
        /* Background color scaling for streak cells */
        .streak-cell {
          color: black; /* Set text color to black */
          background-color: cornflowerblue; /* Change to cornflower blue */
          opacity: 0.5; /* Base opacity */
        }
    
        /* Customize background color opacity based on streak number */
        .streak-cell{
            opacity: 1.0;
            filter: brightness(0.5);
          }
        .streak-background{
            background-color: cornflowerblue;
          }
    
        /* Streak text color and opacity */
        .streak-text {
          color: black;
        }
      </style>
    </head>`

    
    var middle = `
        <body style="font-family: Arial">
        <div class="table-container">
            <table>
            <thead>
                <tr>
                <th>Activity</th>
                <th>Streak</th>
                </tr>
            </thead>
            <tbody>
    `

    table_data.forEach(element => {
        var progress_class = "";        
        
        if (element.completed == false) {
            progress_class = "red-progress";
        }
        else if(element.completed_today == false) {
            progress_class = "yellow-progress";
        }
        else{
            progress_class = "green-progress";
        }

        var percentage = 100*(element.progress/element.frequency);
        const floor = 0.80;
        const ceiling = 1.5;
        const max_streak = 30;
        var streak_brightness = floor + ((Math.min(element.streak,max_streak)/max_streak)* (ceiling-floor));
        element.activity = element.activity[0].toUpperCase() + element.activity.slice(1)

        var temp_str = 
        `
            <tr>
            <td class="activity-cell ${progress_class}">
                <div class="activity-progress ${progress_class}" style="width: ${percentage}%;"></div>
                <span class="activity-text">${element.activity} </span>
            </td>
            <td class="streak-cell" style="filter: brightness(${streak_brightness});">
                <div class="streak-background"></div>
                <div class="streak-text">${element.streak}</div>
            </td>
            </tr>
        
        `
        middle += temp_str
        
    });

    const end = 
    `
    </tbody>
        </table>
    </div>
    </body>
    </html>
    `

    return header + middle + end;

}


export{get_data, render_html}