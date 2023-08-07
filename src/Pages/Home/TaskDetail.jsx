import React from 'react'
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../Firebase/Config";
import EditTask from './EditTask';
import {useEffect } from 'react';
import { useNavigate } from "react-router-dom";
 function TaskDetail() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/");
    }
  });
  let { taskId } = useParams();
   const [user, loading, error] = useAuthState(auth);

   if(user){
    
      return (
        <EditTask user={user} taskId={taskId}/>
      );
    
    

   }
}

export default TaskDetail