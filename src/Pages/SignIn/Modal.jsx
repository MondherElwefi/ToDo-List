import React from "react";
import "./Modal.css"
import { useState } from "react";
import { auth } from "../../Firebase/Config";

function Modal({handleModal,handleSendEmailForgot,handleShowAlert,handleHideAlert}) {
  const [email, setEmail] = useState("");

  

  return (
    <div className="modal" style={{display:"block"}} >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot password</h5>
            <button
              onClick={()=>{
                handleModal()
              }}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <p>Please enter your Email adress and we'll send you instructions on how to reset your password</p>
            <input onChange={(eo)=>{
              setEmail(eo.target.value)
            }} type="text" placeholder="Email" />
          </div>
          <div className="modal-footer">
            <button
            onClick={()=>{
              handleModal()
            }}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button onClick={()=>{
              handleSendEmailForgot(email)
              handleShowAlert()
              handleModal()
              handleHideAlert()

            }} type="button" className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Modal;
