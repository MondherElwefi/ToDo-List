import React from 'react'
import "./Home.css"
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import {Helmet} from "react-helmet";
import HomeUser from './HomeUser';
import HomeNotUser from './HomeNotUser';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "../../Firebase/Config";
import ReactLoading from "react-loading";
function Home() {
  const [user, loading, error] = useAuthState(auth);
  
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
  }else{
    return (
      <>
      <Helmet>
        <title>Home</title>
      </Helmet>
        <Header/>
        <main className='home' >
          {user && <HomeUser/>}
          {!user && <HomeNotUser/>}
          
          
        </main>
        <Footer/>
      </>
    )
  }

  
}

export default Home