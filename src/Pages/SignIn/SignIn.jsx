import { useState } from "react";
import React from "react";
import "./SignIn.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { signInWithEmailAndPassword,sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../Firebase/Config";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModalForgot, setShowModalForgot] = useState(false);
  const [showAlert, setShowAlert] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("successfully Login");
        navigate("/")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  const handleModal = () => {
    setShowModalForgot(false);
  };

  const handleShowAlert = () => {
    setShowAlert("active");
  };
  const handleHideAlert = () => {
    setTimeout(()=>{setShowAlert("");},2000)
  };

  const handleSendEmailForgot=((email)=>{
    sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
      console.log("email sent")
    })
    .catch((error) => {
      console.log(email)
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  })

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Header />

      <main className="signin  my-5 m-xl-1 ">
        <form className="p-5 signin-form">
          <div className="signin-head">
            <AiOutlineLogin />
            <h2>Welcome !</h2>
            <h4>Sign in to your Account </h4>
          </div>
          <input
            onChange={(eo) => {
              setEmail(eo.target.value);
            }}
            type="email"
            placeholder="Email"
            
          />
          <input
            onChange={(eo) => {
              setPassword(eo.target.value);
            }}
            type="password"
            placeholder="Password"
            autoComplete="on"
          />

          <p
            onClick={() => {
              setShowModalForgot(true);
            }}
            className="forgotten-txt"
          >
            Forget Password ?
          </p>
          <button
            onClick={(eo) => {
              eo.preventDefault();
              handleSignIn();
            }}
            type="button"
            className=" btn"
          >
            Sign In
          </button>
          <p className="account-txt">
            I don't Have an Account ?<Link to="/signup">Sign Up</Link>{" "}
          </p>
        </form>

        {showModalForgot && <Modal handleModal={handleModal} handleSendEmailForgot={handleSendEmailForgot}  handleShowAlert={handleShowAlert} handleHideAlert={handleHideAlert}/>}
            
        <div className={`alert ${showAlert} alert-success`} role="alert">
        Check Your Email  to reset your Password
      </div>    
      </main>
      
      <Footer />
    </>
  );
}

export default SignIn;
