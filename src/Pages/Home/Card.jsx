import React from "react";
import "./Card.css";
import { db } from "../../Firebase/Config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Moment from 'react-moment';
function Card({ userId }) {
  
  const [value, loading, error] = useCollection(collection(db, userId));
  if (loading) {
    return (
      <main className="profile">
        <ReactLoading
          type={"spinningBubbles"}
          color={"#f458"}
          height={"15%"}
          width={"15%"}
        />
      </main>
    );
  }
  if (value) {
    
    if (value.docs.length != 0) {
      return (
        <div className="cards">
          
          {value.docs.map((task, key) => {
            let limitShowTask = 0;
            return (
              <Link
                key={key}
                to={`/taskDetail/${task.data().taskId}`}
                className="task-card"
              >
                <div className="head-card">
                  <p className="priority">
                    {task.data().priority != "null" ? task.data().priority : ""}
                  </p>
                  <p className="time-task"><Moment date={task.data().taskId} fromNow/></p>
                </div>
                <div>
                  <h1 className="task-title">{task.data().title}</h1>
                  <ul>
                    {task.data().details.map((details, key) => {
                      if (limitShowTask < 4) {
                        limitShowTask++;
                        return <li   key={key}>{details}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                </div>
                
              </Link>
            );
          })}
        </div>
      );
    } else {
      return(
      <div>
        
        <h1>You Have No Tasks to do</h1>
      </div>);
    }
  }
}

export default Card;
