
import "./Profile.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Helmet } from "react-helmet";
import { auth } from "../../Firebase/Config";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactLoading from "react-loading";
import {useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
function Profile() {
  const navigate = useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/");
    }
  });
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
  }
  if (user) {
    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <Header />
        <main className="profile">
        <FaRegUserCircle/>
          <h2>Display Name : {user.displayName}</h2>

          <h2>Email : {user.email}</h2>
        </main>
        <Footer />
      </>
    );
  }
}

export default Profile;
