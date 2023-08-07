import "./EditTask.css";
import { useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../Firebase/Config";
import {
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Moment from 'react-moment';
import { FaRegTrashAlt,FaArrowCircleLeft } from "react-icons/fa";

function EditTask({ user, taskId }) {
  const navigate = useNavigate();

  const [value, loading, error] = useDocument(doc(db, user.uid, taskId));
  const [addTask, setAddTask] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleCompletedTask = async(eo) => {
    if(eo.target.checked){
      await updateDoc(doc(db, user.uid, taskId), {
        completed: true,
      });
    }else{
      await updateDoc(doc(db, user.uid, taskId), {
        completed: false,
      });
    }
  }

  if (value) {
    return (
      <div className="edit-task">

        <div className="first-section">
          <input
            className="title"
            onChange={async (eo) => {
              await updateDoc(doc(db, user.uid, taskId), {
                title: eo.target.value,
              });
            }}
            type="text"
            defaultValue={value.data().title}
          />
          <select
            onChange={async (eo) => {
              await updateDoc(doc(db, user.uid, taskId), {
                priority: eo.target.value,
              });
            }}
          >
            <option selected defaultValue="null">
              {value.data().priority} Priority
            </option>
            <option value="Hight">Hight</option>
            <option value="Meduim">Meduim</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="info">
      
          <p className="time">Created  <Moment date={value.data().taskId} fromNow/> </p>
          
          <div>
            <input onChange={(eo)=>{
              handleCompletedTask(eo)
            }} type="checkbox" checked={value.data().completed} />
            <label>Completed</label>
          </div>
        </div>


        <ul>
          {value.data().details.map((item, key) => {
            return (
              <li className="task ">
                <p>{item} </p>
                <span
                  onClick={async () => {
                    await updateDoc(doc(db, user.uid, taskId), {
                      details: arrayRemove(item),
                    });
                  }}
                  className="trash"
                >
                  <FaRegTrashAlt/>
                </span>{" "}
                
              </li>
            );
          })}
          {addTask && (
            <li className="task ">
              <input
              placeholder="New Task"
              className="add-sub-task"
                onChange={(eo) => {
                  setNewTask(eo.target.value);
                }}
                type="text"
              />
              <button
              className="btn-manage-task"
                onClick={async () => {
                  setAddTask(false);
                  await updateDoc(doc(db, user.uid, taskId), {
                    details: arrayUnion(newTask),
                  });
                }}
              >
                Add
              </button>
              <button
              className="btn-manage-task"
                onClick={() => {
                  setAddTask(false);
                }}
              >
                Cancel
              </button>
            </li>
          )}
        </ul>

<div className="info">
<button
          onClick={() => {
            setAddTask(true);
          }}
          
        >
          Add Task
        </button>

        <button
          onClick={async () => {
            navigate("/")
            await deleteDoc(doc(db, user.uid, taskId));
          }}
          
        >
          Delete
        </button>
</div>
        

        <button
        
          onClick={async () => {
            navigate("/")
          }}
          className="back-btn "
        >
          <FaArrowCircleLeft/>
        </button>
      </div>
    );
  }
}

export default EditTask;
