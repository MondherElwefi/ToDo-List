import { useState } from "react";
import "./SignUp.css";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Helmet } from "react-helmet";
import { auth } from "../../Firebase/Config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("successfully created");
        updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            // Profile updated!
            // ...
            navigate("/")
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("error");
      });
      
  };
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Header />

      <main className="signup row  my-5 m-xl-1">
        <form className="p-5 signup-form">
          <div className="signup-head">
            <BiUserCircle />
            <h2>Create account !</h2>
            <h4>Sign in to your Account </h4>
          </div>
          <input
            onChange={(eo) => {
              setFirstName(eo.target.value);
            }}
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(eo) => {
              setLastName(eo.target.value);
            }}
            type="text"
            placeholder="Last Name"
          />
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
          <button
            onClick={(eo) => {
              eo.preventDefault();
              handleSignUp();
            }}
            type="button"
            className=" btn"
          >
            Sign Up
          </button>
          <p className="account-txt">
            I Already Have an Account<Link to="/signin">Sign In</Link>{" "}
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default SignUp;
