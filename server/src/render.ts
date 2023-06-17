
import { Pool_Object, Pool_Query } from "./models/daily_status_model"; 

const get_data = () => {
    // var rslt : string = "";
    // // const url = "https://habbit.azurewebsites.net/api/main";
    const url = "http://localhost:8080/api/main"
    
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


    // .catch((error)=> {
    //     console.log("fetch request failed");
    // })

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
          width: 50%;
          border-radius: 10px; /* Add border radius to round corners */
          overflow: hidden; /* Hide overflowing content */
        }
    
        th, td {
          padding: 8px;
          text-align: center; /* Center the text in all columns */
          color: #333; /* Darker text color */
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
          background-color: yellow;
        }
    
        .green-progress {
          background-color: green;
        }
    
        .red-progress {
          background-color: red;
        }
    
        .activity-text {
          position: relative;
          z-index: 2;
          color: black; /* Set font color to black */
        }
    
        /* Adjust the width of the progress bar */
        .yellow-progress {
          width: 80%;
        }
    
        .green-progress {
          width: 50%;
        }
    
        .red-progress {
          width: 20%;
        }
    
        /* Set default background colors based on progress bar colors */
        .activity-cell.yellow-progress {
          background-color: lightyellow;
        }
    
        .activity-cell.green-progress {
          background-color: lightgreen;
        }
    
        .activity-cell.red-progress {
          background-color: lightcoral;
        }
    
        /* Background color scaling for streak cells */
        .streak-cell {
          color: black; /* Set text color to black */
          background-color: cornflowerblue; /* Change to cornflower blue */
          opacity: 0.5; /* Base opacity */
        }
    
        /* Customize background color opacity based on streak number */
        .streak-cell[data-streak="1"] {
          background-color: cornflowerblue;
          opacity: 0.2;
        }
    
        .streak-cell[data-streak="2"] {
          background-color: cornflowerblue;
          opacity: 0.3;
        }
    
        .streak-cell[data-streak="3"] {
          background-color: cornflowerblue;
          opacity: 0.4;
        }
    
        .streak-cell[data-streak="4"] {
          background-color: cornflowerblue;
          opacity: 0.5;
        }
    
        .streak-cell[data-streak="5"] {
          background-color: cornflowerblue;
          opacity: 0.6;
        }
    
        /* Continue the pattern for other streak numbers */
    
        .streak-cell[data-streak="14"] {
          background-color: cornflowerblue;
          opacity: 1;
        }
    
        /* Streak text color and opacity */
        .streak-text {
          color: black;
          opacity: 1;
        }
      </style>
    </head>`

    
    var middle = `
        <body>
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
        var temp_str = 
        `
            <tr>
            <td class="activity-cell yellow-progress">
                <div class="activity-progress yellow-progress"></div>
                <span class="activity-text">${element.activity}</span>
            </td>
            <td class="streak-cell" data-streak="5"><span class="streak-text">5</span></td>
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