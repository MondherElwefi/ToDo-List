import "./HomeUser.css";
import { auth } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import Card from "./Card";
import CardAddTask from "./CardAddTask";
import { useState } from "react";

import ReactLoading from "react-loading";
import {useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function HomeUser() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [showAddTask, setShowAddTask] = useState(false);
  const handleCloseAddTask = () => {
    setShowAddTask(false);
  };
  
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
  if(user){
    return (
      <div className="home-user">
        
          
        <Card userId={user.uid} />
        {showAddTask && <CardAddTask handleCloseAddTask={handleCloseAddTask} />}
        <button
          onClick={() => {
            setShowAddTask(true);
            
          }}
          className="btn btn-primary"
        >
          Add Task
        </button>
      </div>
    );
  }
  
}

export default HomeUser;
