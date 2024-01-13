import React, { useState } from "react";
import twitterImage from "../../assets/Images/twitter.jpeg";
import TwitterIcon from "@mui/icons-material/Twitter";
import auth from "../../firebase.init";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import "./Login.css";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  //const [errormessage, seterrormessage] = useState("")
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleuser, googleloading, googleerror] =
    useSignInWithGoogle(auth);
  if (user || googleuser) {
    navigate("/");
    console.log(user);
    console.log(googleuser);
  }
  if (error) {
    console.log(error.message);
  }
  if (loading) {
    console.log("Loading...");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(email, password);
  };
  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  console.log(user);
  console.log(error);
  return (
    <div className="login-container">
      <div className="image-container">
        <img className="image" src={twitterImage} alt="" />
      </div>
      <div className="form-container">
        <div className="form-box">
          <TwitterIcon className="Twittericon" style={{ color: "skyblue" }} />
          <h2 className="heading">Happening now</h2>
          <h3 className="heading1">What happening today</h3>
          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              className="email"
              placeholder="Email address"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="submit" className="btn">
                Login
              </button>
            </div>
          </form>
          <hr />
          <div className="google-button">
            <GoogleButton
              className="g-btn"
              type="light"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div>
            Not have an account ?
            <Link
              to={"/signUp"}
              style={{
                textdecoration: "none",
                color: "skyblue",
                fontWeight: "600",
                marginLeft: "5px",
              }}
            >
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
