import React from "react";
import "../stylesheets/table.css"

const Buttons = (props) => {

    const handleClick = () =>{
        if (props.onClick) {
            props.onClick();
        }
    }
    
    
    return (
        <div className="Button_Row">
            
            <div className="Clear_Button">
                <button>Clear</button>
            </div>

            <div className="Submit_Button">
                <button>Submit</button>
            </div>

        </div>
        
        
    );
  }
  
  export {Buttons};