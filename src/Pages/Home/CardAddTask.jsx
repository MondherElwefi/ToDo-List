import React, { useState } from "react";
import "./CardAddTask.css";
import { doc, setDoc } from "firebase/firestore"; 
import { db } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Config";


const sendTaskData = async(userId,title,priority,detailsTab) => {
  const taskId = new Date().getTime();
  await setDoc(doc(db, userId,`${taskId}` ), {
    taskId:taskId,
    title: title,
    priority: priority,
    details: detailsTab,
    completed: false,
  });  
  
}


function CardAddTask({ handleCloseAddTask }) {
  const [user, loading, error] = useAuthState(auth);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [details, setDetails] = useState("");
  const [detailsTab, setDetailsTab] = useState([]);
  

  if(user){
    return (
      <div className="card-add-task">
        <button
          onClick={() => {
            handleCloseAddTask();
          }}
          type="button"
          className="btn-close"
          aria-label="Close"
        ></button>
        <input onChange={(eo)=>{
          setTitle(eo.target.value)
        }} className="title-task" type="text" placeholder="Title Of Task" />
        <select
          onChange={(eo) => {
            setPriority(eo.target.value);
            console.log(eo.target.value)
          }}
        >
          <option  selected  value="null">Choose the priotrity</option>
          <option    value="Hight">Hight</option>
          <option  value="Meduim">Meduim</option>
          <option value="Low">Low</option>
        </select>
        <div className="details-sec">
          <input
            value={details}
            onChange={(eo) => {
              setDetails(eo.target.value);
            }}
            className="details-task"
            type="text"
            placeholder="Details"
          />
          <button
            onClick={() => {
              detailsTab.push(details);
              setDetails("");
              setDetailsTab(detailsTab);
            }}
            className="add-details-btn"
          >
            Add
          </button>
        </div>
  
        <ul className="sub-task">
          {detailsTab.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
        <button onClick={()=>{
          sendTaskData(user.uid,title,priority,detailsTab)
          handleCloseAddTask();
        }} className="add-task-btn ">Add Task</button>
      </div>
    );
  }
  
}

export default CardAddTask;
