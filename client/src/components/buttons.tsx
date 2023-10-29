import React from "react";
import { useState, useEffect} from "react";
import "../stylesheets/buttons.css"

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

    const handleTrack = async () =>{
        if (props.handleTrack) {
            await props.handleTrack();
        }
    }
    
    
    return (
        <div className="Button_Row">
            
            <div className="Clear_Button">
                <button onClick={handleClear}>Clear</button>
            </div>

            <div className="Delete_Button">
                <button onClick={handleClear}>-</button>
            </div>

            <div className={`Activate_Button`}>
                <button onClick={handleTrack}>Track</button>
            </div>

            <div className="Add_Button">
                <button onClick={handleClear}>+</button>
            </div>
            
            <div className="Submit_Button">
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>
        
        
    );
  }
  
  export {Buttons};