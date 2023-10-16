import React from "react";
import "../stylesheets/table.css"

const Buttons = (props) => {

    const handleClear = async () =>{
        if (props.handleClear) {
            await props.handleClear();
        }
    }

    const handleSubmit = async () => {
        if (props.handleSubmit) {
            await props.handleSubmit();
        }
    }
    
    
    return (
        <div className="Button_Row">
            
            <div className="Clear_Button">
                <button onClick={handleClear}>Clear</button>
            </div>

            <div className="Submit_Button">
                <button type="submit">Submit</button>
            </div>

        </div>
        
        
    );
  }
  
  export {Buttons};