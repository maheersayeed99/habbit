import React from "react";
import "../stylesheets/modal.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"




const DeleteModal : React.FC = (props) => {

    const hide_modal = async () => {
        console.log("clicked");
        if (props.cancel){
            await props.cancel()
        }
    }

    const submit_content = async () => {
        console.log("clicked");
        if (props.submit){
            await props.submit()
        }
    }
    
    return (
        <div className={`full-modal ${ props.active ? "" : "disabled" }`}>
            <div className="modal-box">
                <div className="modal-content">
                    
                    <div className="modal-input">
                        <div className="modal-text">Activity</div>
                        <div className="modal-field"><input type="text" id="remove_field" name="myTextField"></input></div>
                    </div>

                </div>
                
                <div className="button-shelf">
                    <div className="add-button">
                        <button onClick={submit_content}>Remove</button>
                    </div>
                    <div className="cancel-button">
                        <button onClick={hide_modal}>Cancel</button>
                    </div>
                </div>

            </div>

        </div>
    );



}

export {DeleteModal}


