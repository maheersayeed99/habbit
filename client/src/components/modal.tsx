import React from "react";
import "../stylesheets/modal.css"
import { Row } from "./row.tsx";
import { Buttons } from "./buttons.tsx";
import { useState, useEffect} from "react";
import axios from "axios"
import {authenticate} from "../utilities/helper.ts"
// import path from "path"
// require('dotenv').config()

const Modal : React.FC = () => {

    
    return (
        <div className="full-modal">
            <div className="modal-box">
                <div className="modal-content">
                    
                    <div className="modal-input">
                        <div className="modal-text">Activity</div>
                        <div className="modal-field"><input type="text" id="myTextField" name="myTextField"></input></div>
                    </div>
                    <div className="modal-input">
                        <div className="modal-text">Frequency</div>
                        <div className="modal-field"><input type="number" id="myTextField" name="myTextField"></input></div>
                    </div>
                    <div className="modal-input">
                        <div className="modal-text">Span</div>
                        <div className="modal-field"><input type="number" id="myTextField" name="myTextField"></input></div>
                    </div>
                    <div className="modal-input">
                        <div className="modal-text">Streak</div>
                        <div className="modal-field"><input type="number" id="myTextField" name="myTextField"></input></div>
                    </div>

                    

                </div>
                
                <div className="button-shelf">
                    <div className="add-button">
                        <button>Add</button>
                    </div>
                    <div className="cancel-button">
                        <button>Cancel</button>
                    </div>
                </div>

            </div>

        </div>
    );



}

export {Modal}

