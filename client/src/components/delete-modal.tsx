import React from "react";
import "../stylesheets/modal.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"
// import path from "path"
// require('dotenv').config()

const DeleteModal : React.FC = (props) => {

    const [active, activate] = useState(props.active ? "" : "disabled")

    // if (props.active){
    //     if (props.active == true){
    //         activate("")
    //     }
    //     else if(props.active == false){
    //         activate("disabled")
    //     }
    // }
    
    return (
        <div className={`full-modal ${active}`}>
            <div className="modal-box">
                <div className="modal-content">
                    
                    <div className="modal-input">
                        <div className="modal-text">Activity</div>
                        <div className="modal-field"><input type="text" id="myTextField" name="myTextField"></input></div>
                    </div>

                </div>
                
                <div className="button-shelf">
                    <div className="add-button">
                        <button>Remove</button>
                    </div>
                    <div className="cancel-button">
                        <button>Cancel</button>
                    </div>
                </div>

            </div>

        </div>
    );



}

export {DeleteModal}


